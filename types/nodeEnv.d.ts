declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;

    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;

    NEXT_PUBLIC_TINYMCE_KEY: string;
  }
}
