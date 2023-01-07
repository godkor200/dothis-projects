declare namespace NodeJS {
  interface ProcessEnv {
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;

    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;

    TOSS_PAYMENTS_DEV_CLIENT_KEY: string;
    TOSS_PAYMENTS_DEV_SECRET_KEY: string;

    DOTHIS_AWS_ACCESS_KEY_ID: string;
    DOTHIS_AWS_SECRET_ACCESS_KEY: string;
  }
}
