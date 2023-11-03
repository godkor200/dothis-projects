export interface GoogleLoginRedirectRes {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  isEnvLocal: boolean;
}
