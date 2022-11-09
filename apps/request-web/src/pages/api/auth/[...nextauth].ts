import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import InstagramProvider from 'next-auth/providers/instagram';
import TwitchProvider from 'next-auth/providers/twitch';

import { pagePath } from '@/constants';
import YoutubeProvider from '@/providers/youtube';
import { prisma } from '~/prisma/client';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    YoutubeProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: pagePath.login().pathname,
  },
  callbacks: {
    async jwt({ token: _token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        _token.accessToken = account.access_token;
      }

      const token = {
        ..._token,
      };
      if (user) token.user = user;

      return token;
    },
    async session({ session: _session, token, user }) {
      if (token) {
        // _session.user = token.user as any;
        // @ts-ignore
        _session.accessToken = token.accessToken;
        // @ts-ignore
        _session.refreshToken = token.refreshToken;
        _session.user = token.user as any;
      }

      return _session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
