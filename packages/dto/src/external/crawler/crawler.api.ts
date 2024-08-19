import { zVideoErrConflict } from '../video';
import { zErrUnauthorized, zSuccessBase, c } from '../../lib';
import { zCrawlingCompleteSchema } from './crawler.zod';
const zVideoErrRes = { 401: zErrUnauthorized, 409: zVideoErrConflict };

export const externalCrawlerApi = c.router({
  completeVideos: {
    method: 'POST' as const,
    path: `youtube-shorts/crawling/complete`,
    body: zCrawlingCompleteSchema,
    responses: { 200: zSuccessBase, ...zVideoErrRes },
    summary: '크롤링 완료 시그널을 보냅니다',
    description: '크롤링 완료 시그널을 보냅니다',
  },
});
