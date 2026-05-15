const USER_TOKEN_KEY = "dt_user_token";
const USER_PROFILE_KEY = "dt_user_profile";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  status: string;
  emailVerified?: boolean;
}

export class UserApiError extends Error {
  code?: string;
  email?: string;
  verificationEmailSent?: boolean;
  retryAfterSec?: number;
  lockReason?: string;
  sendError?: string;

  constructor(
    message: string,
    options?: {
      code?: string;
      email?: string;
      verificationEmailSent?: boolean;
      retryAfterSec?: number;
      lockReason?: string;
      sendError?: string;
    },
  ) {
    super(message);
    this.name = "UserApiError";
    this.code = options?.code;
    this.email = options?.email;
    this.verificationEmailSent = options?.verificationEmailSent;
    this.retryAfterSec = options?.retryAfterSec;
    this.lockReason = options?.lockReason;
    this.sendError = options?.sendError;
  }
}

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN_KEY);
}

export function setUserSession(token: string, user: UserProfile) {
  localStorage.setItem(USER_TOKEN_KEY, token);
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
}

export function getUserProfile() {
  const raw = localStorage.getItem(USER_PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function clearUserSession() {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_PROFILE_KEY);
}

async function parseErrorResponse(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as {
    message?: string;
    code?: string;
    email?: string;
    verificationEmailSent?: boolean;
    retryAfterSec?: number;
    lockReason?: string;
    sendError?: string;
  };
  throw new UserApiError(payload.message ?? "Request failed", {
    code: payload.code,
    email: payload.email,
    verificationEmailSent: payload.verificationEmailSent,
    retryAfterSec: payload.retryAfterSec,
    lockReason: payload.lockReason,
    sendError: payload.sendError,
  });
}

let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshSession(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const response = await fetch("/api/user-auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) return false;

      const data = (await response.json()) as {
        accessToken?: string;
        token?: string;
        user: UserProfile;
      };
      const accessToken = data.accessToken ?? data.token;
      if (!accessToken) return false;

      setUserSession(accessToken, data.user);
      return true;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function userLogout() {
  try {
    await fetch("/api/user-auth/logout", { method: "POST", credentials: "include" });
  } finally {
    clearUserSession();
  }
}

export async function userApiFetch<T>(url: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers ?? {});

  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const credentials = init.credentials ?? "include";

  const doFetch = async (attachAuth: boolean) => {
    const requestHeaders = new Headers(headers);
    if (attachAuth) {
      const token = getUserToken();
      if (token) requestHeaders.set("Authorization", `Bearer ${token}`);
    }
    return fetch(url, { ...init, headers: requestHeaders, credentials });
  };

  let response = await doFetch(true);

  if (response.status === 401 && !url.includes("/user-auth/refresh") && !url.includes("/login")) {
    const refreshed = await tryRefreshSession();
    if (refreshed) {
      response = await doFetch(true);
    }
  }

  if (!response.ok) {
    await parseErrorResponse(response);
  }

  return response.json() as Promise<T>;
}
