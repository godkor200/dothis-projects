import { isMessage } from '@dothis/share';
import type { IncomingMessage } from 'http';
import type { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

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
  const message = req?.session?.message;
  if (isMessage(message)) {
    delete req.session.message;
    await req.session.save();
    return { session_message: message };
  }
  return null;
};
