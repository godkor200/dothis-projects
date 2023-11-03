export type JwtPayloadWithToken = {
  email: string;
  sub: number;
  refreshToken: string;
};

export type JwtPayload = Omit<JwtPayloadWithToken, 'refreshToken'>;

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type TDecodePayload = {
  [key: string]: any;
  id: string;
  userEmail: string;
  iat: number;
  exp: number;
  channelId: string;
  isAdmin: boolean;
  isEnvLocal: boolean;
};
