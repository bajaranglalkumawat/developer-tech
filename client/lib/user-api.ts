const USER_TOKEN_KEY = "dt_user_token";
const USER_PROFILE_KEY = "dt_user_profile";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  status: string;
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

export async function userApiFetch<T>(url: string, init: RequestInit = {}): Promise<T> {
  const token = getUserToken();
  const headers = new Headers(init.headers ?? {});

  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, { ...init, headers });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}
