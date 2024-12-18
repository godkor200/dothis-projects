import { errorMessage } from '@dothis/share';
import { auth as googleAuth } from 'googleapis/build/src/apis/oauth2';
import { youtube } from 'googleapis/build/src/apis/youtube';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import superjson from 'superjson';

import { CreatorDomain } from '@/domain';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send(superjson.stringify({ err: 'there is no session' }));
  } else {
    const clientId = process.env.GOOGLE_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    // @ts-ignore
    const accessToken = session?.accessToken as string;
    const userId = session.user.id as string;

    console.log('session', session);
    const auth = new googleAuth.OAuth2({
      clientId,
      clientSecret,
    });
    auth.setCredentials({
      // @ts-ignore
      access_token: accessToken,
      // refresh_token: refreshToken,
    });

    const service = youtube('v3');
    await service.channels.list(
      {
        auth,
        part: 'snippet,contentDetails,statistics'.split(','),
        mine: true,
      },
      async function (err: Error | null, response: any) {
        if (err) {
          console.log('The API returned an error: ' + err);
          return res.status(403).send(
            errorMessage({
              message: '크리에이터 인증 과정에서 에러가 발생했습니다.',
            }),
          );
        }

        const channels = response.data.items;
        if (!channels) {
          return res.status(400).send(
            errorMessage({
              message: '보유하고 계신 채널이 없습니다.',
            }),
          );
        } else {
          let maxSubscriberIndex = 0;
          for (let i = 1; i < channels.length; i++) {
            let maxChannel = channels[maxSubscriberIndex];
            let curChannel = channels[i];
            if (
              curChannel.statistics.subscriberCount >
              maxChannel.statistics.subscriberCount
            ) {
              maxSubscriberIndex = i;
            }
          }

          let result = await CreatorDomain.db.setCreator(
            userId,
            channels[maxSubscriberIndex].id,
          );

          return res.status(200).redirect('/');
          // res.setHeader('Content-Type', 'text/html; charset=utf-8');
          // return res.send(superjson.stringify(channels));
        }
      },
    );
  }
}
