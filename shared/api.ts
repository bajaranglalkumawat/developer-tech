/**

 * Shared code between client and server

 * Useful to share types between client and server

 * and/or small pure JS functions that can be used on both client and server

 */



/**

 * Example response type for /api/demo

 */

export interface DemoResponse {

  message: string;

}



export interface PublicConfigResponse {

  googleClientId: string;

}



export interface QuerySubmitRequest {

  name: string;

  email: string;

  phone?: string;

  subject: string;

  message: string;

}



export interface QuerySubmitResponse {

  success: boolean;

  message: string;

}



export interface UserAuthProfile {

  id: string;

  email: string;

  name: string;

  status: string;

  emailVerified: boolean;

}



export interface UserRegisterResponse {

  message: string;

  email: string;

  requiresVerification: true;

}



export interface UserSignupSendOtpResponse {
  message: string;
  email: string;
  retryAfterSec?: number;
}



export interface UserSignupVerifyResponse extends UserAuthTokensResponse {

  message: string;

}



export interface UserAuthTokensResponse {

  accessToken: string;

  /** @deprecated Use accessToken */

  token: string;

  user: UserAuthProfile;

}



export type UserLoginResponse = UserAuthTokensResponse;



export interface UserVerifyEmailResponse {

  message: string;

  verified: boolean;

  code?: string;

}



export interface UserResendVerificationResponse {

  message: string;

}



export interface UserForgotPasswordResponse {

  message: string;

}



export interface UserResetPasswordResponse extends UserAuthTokensResponse {

  message: string;

}



export interface UserRefreshResponse extends UserAuthTokensResponse {}



export interface UserLogoutResponse {

  message: string;

}



export interface ApiErrorBody {

  message: string;

  code?: string;

  email?: string;

  verificationEmailSent?: boolean;

  retryAfterSec?: number;

  lockReason?: string;

  sendError?: string;

}


