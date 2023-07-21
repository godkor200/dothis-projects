import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathMatch } from 'next/dist/shared/lib/router/utils/path-match';
import type { z } from 'zod';

import { mockApiPathname } from '@/constants/dev';
import type { ApiRouterResponse } from '@/utils/apiClient';
import { apiRouter } from '@dothis/dto';

const urlMatchDynamicPath = (url: string) => (dynamicPath: string) =>
  getPathMatch(`${mockApiPathname}${dynamicPath}`, { strict: true })(url);

export default function handler(
  { url, method, query }: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('/---------------- MOCK API ----------------/');
  console.log('method: ', method);
  console.log('url: ', url);
  console.log('query: ', query);
  // console.log('/-------------------------------------------/');

  if (!url) return res.status(404).end();
  const matchDynamicPath = urlMatchDynamicPath(url);
  const res200 = res.status(200);

  switch (method) {
    case 'GET':
      if (matchDynamicPath(apiRouter.auth.getGoogleLogin.path)) return res200;
      break;
    case 'POST':
      // if (matchDynamicPath(apiRouter.user.verifyAccessTokenPost.path))
      //   return res200.json(mockUsers);
      break;
    case 'PUT':
      break;
    case 'DELETE':
      break;
    case 'PATCH':
      break;
  }
}

// const mockToken: ApiRouterResponse['user']['verifyTokenGet']['body'] =
//   'kajsdlkfjlksdjflkjslkfjksdl';

const mockUsers = [
  {
    id: 'dkdlel1',
    name: '홍길동',
    profileImage: '',
  },
  {
    id: 'dkdlel2',
    name: '이순갓',
    profileImage: '',
  },
  {
    id: 'dkdlel3',
    name: '세종',
    profileImage: '',
  },
];

const mockVideoTags = [
  { name: '부동산', useCount: 123, viewCount: 123456789 },
  {
    name: '호리병',
    useCount: 421,
    viewCount: 948222,
  },
  {
    name: '호구',
    useCount: 421,
    viewCount: 948222,
  },
];
const mockChannelTags = ['정보', '경제', '이슈'];
