import type { PartialRequiredNotNull } from '@dothis/share';
import { errorMessage } from '@dothis/share';
import { withIronSessionSsr } from 'iron-session/next';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next/types';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { sessionOptions } from './sessionUtils';

// user Session의 데이터가 올바르지 않은 경우 로그인페이지로 보냄
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
