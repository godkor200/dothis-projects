import { c } from '../lib/contract';
import type {} from 'zod';
import { externalChannelsApi } from './channel';
import { externalVideoApi } from './video';
import { externalAuthApi } from './auth';
import { externalCrawlerApi } from './crawler';
export const externalApiRouter = c.router({
  channel: externalChannelsApi,
  video: externalVideoApi,
  auth: externalAuthApi,
  crawler: externalCrawlerApi,
});
