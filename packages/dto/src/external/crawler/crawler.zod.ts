import { z } from 'zod';

export const zCrawlingCompleteSchema = z.object({
  jobId: z.string(),
  status: z.enum(['success', 'failure']),
  message: z.string(),
  crawledAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

const Stats = z.object({
  pv: z.number().default(0),
  userTypeM: z.number().default(0),
  userTypeG: z.number().default(0),
  likeCount: z.number().default(0),
  chatCount: z.number().default(0),
  subscribeCount: z.number().default(0),
});

const Creators = z.object({
  profileUrl: z.string().url(),
  name: z.string(),
});

const Counter = z.object({
  likeCount: z.number(),
  joinCount: z.number(),
  commentCount: z.number(),
  subscribeCount: z.number(),
});

export const PostCompleteVideoRequest = z.object({
  id: z.string(),
  clientId: z.string(),
  vodId: z.string(),
  shortformId: z.string(),
  managerId: z.string(),
  operatorId: z.string(),
  youtubeUrl: z.string().url(),
  youtubeId: z.string(),
  type: z.enum(['youtube']),
  status: z.enum(['standby', 'converting', 'error', 'complete']),
  desc: z.string(),
  title: z.string(),
  counter: Counter,
  uploadAt: z.date(),
  updatedAt: z.date(),
  isDel: z.boolean().default(false),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  creators: Creators,
  stats: Stats,
  loadType: z.enum(['vod', 'youtube']),
});
