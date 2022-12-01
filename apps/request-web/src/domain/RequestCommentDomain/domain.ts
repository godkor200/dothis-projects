import type { AwaitedReturn } from '@dothis/share';
import type { RequestComment, RequestCommentHeart, User } from '@prisma/client';
import { groupBy } from 'fp-ts/lib/NonEmptyArray';
import { z } from 'zod';

import { schema as userSchema } from '../UserDomain/domain';
import type { db } from './index';

type WithChildrenComments = Pick<
  AwaitedReturn<typeof db.getDetailItems>[number],
  'id' | 'childrenComments' | 'rootId' | 'createdAt'
>;

export type Schema = z.infer<typeof schema>;

export type CreateSchema = z.infer<typeof createSchema>;

export const schema = z.object({
  id: z.bigint(),
  requestId: z.bigint().nullish(),
  userId: userSchema.shape.id.nullish(),
  parentId: z.bigint().nullish(),
  rootId: z.bigint().nullish(),
  content: z
    .string()
    .min(0, { message: '최소 한글자 이상 입력해주세요.' })
    .max(1000, { message: '최대 1000자까지 작성 가능합니다.' }),
});

export const createSchema = schema
  .pick({
    parentId: true,
    content: true,
    rootId: true,
  })
  .extend({
    userId: userSchema.shape.id,
    requestId: z.bigint(),
  });

export const utils = {
  makeViewComments,
  getMostHeartsComment,
};

function getMostHeartsComment(
  comments: (RequestComment & { hearts: RequestCommentHeart[]; user: User })[],
) {
  if (comments.length === 0) return null;

  return comments.reduce((prev, curr) => {
    if (prev.hearts.length > curr.hearts.length) return prev;

    return curr;
  });
}

const dateASC = (
  c1: Pick<RequestComment, 'createdAt'>,
  c2: Pick<RequestComment, 'createdAt'>,
) => (c1.createdAt > c2.createdAt ? 1 : -1);

const groupByForRootId = <T extends Pick<RequestComment, 'rootId'>>(item: T) =>
  item.rootId ? `${item.rootId}` : 'root';

function makeViewComments<T extends WithChildrenComments>(comments: Array<T>) {
  if (comments.length === 0) return [] as T[];

  const groupByRootId = groupBy(groupByForRootId)(comments);

  let resultArr: T[] = [];

  if (!groupByRootId.root) return resultArr;

  for (const rootComment of groupByRootId.root.sort(dateASC)) {
    resultArr.push(rootComment);

    const descendants = groupByRootId[`${rootComment.id}`];

    if (!descendants) continue;

    resultArr = resultArr.concat(descendants.sort(dateASC));
  }

  return resultArr;
}
