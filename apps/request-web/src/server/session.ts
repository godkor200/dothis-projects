import type { Message, PartialRequiredNotNull } from '@dothis/share';
import { errorMessage, isMessage } from '@dothis/share';
import type { IncomingMessage } from 'http';
import type { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UrlObject } from 'url';

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXTAUTH_SECRET as string,
  cookieName: 'sid',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const withSessionRoute = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, sessionOptions);

export const withSessionSSR = <
  P extends Record<string, unknown> = Record<string, unknown>,
>(
  handler: ServerSideHandler<P>,
) => withIronSessionSsr(handler, sessionOptions);

type ServerSideHandler<P> = (
  context: GetServerSidePropsContext,
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export const flushMessageSession = async (req: IncomingMessage) => {
  const { message } = req.session;
  if (isMessage(message)) {
    delete req.session.message;
    await req.session.save();
    return { session_message: message };
  }
  return null;
};

export const withUserSessionSSR = <
  P extends Record<string, unknown> = Record<string, unknown>,
>(
  handler: (
    context: GetServerSidePropsContext,
    userSession: PartialRequiredNotNull<Session['user'], 'id' | 'name'>,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
  fallbackUrl: string,
) =>
  withIronSessionSsr(async (context) => {
    const session = await getSession(context);
    if (!session?.user.id || !session?.user.name) {
      context.req.session.message = errorMessage({
        message: '로그인이 필요한 서비스입니다.',
      });
      await context.req.session.save();
      return {
        redirect: {
          destination: fallbackUrl,
          permanent: false,
        },
      };
    }
    return handler(
      context,
      session.user as PartialRequiredNotNull<Session['user'], 'id' | 'name'>,
    );
  }, sessionOptions);
