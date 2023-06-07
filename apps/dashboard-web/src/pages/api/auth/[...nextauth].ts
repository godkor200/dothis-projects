import type { NextApiHandler } from 'next';
import { redirect } from 'next/dist/server/api-utils';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

//초기화
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    //구글 provider 정의
    GoogleProvider({
      clientId: process.env['GOOGLE_CLIENT_ID'] as string,
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    }),
  ],
  // pages: {
  //   signIn: '/login',
  // },
};
