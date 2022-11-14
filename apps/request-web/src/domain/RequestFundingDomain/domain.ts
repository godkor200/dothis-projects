import type {
  RequestFunding,
  RequestFundingStatus,
  User,
} from '@prisma/client';
import { sort } from 'fp-ts/Array';
import { fromCompare } from 'fp-ts/Ord';
import { z } from 'zod';

import { schema as userSchema } from '../UserDomain/domain';

type RequestFundingIncludeUser = RequestFunding & { user: User | null };
const _quantityAmountDesc = sort(
  fromCompare<Pick<RequestFunding, 'quantity'>>((x, y) =>
    x.quantity > y.quantity ? -1 : x.quantity < y.quantity ? 1 : 0,
  ),
);

export const schema = z.object({
  id: z.bigint(),
  userId: userSchema.shape.id.nullish(),
  createdAt: z.date(),
  quantity: z
    .number({
      invalid_type_error: '숫자만 입력해주세요.',
      required_error: '금액을 입력해주세요.',
    })
    .step(100, {
      message: '후원금 입력은 100원 단위로 입력해주세요.',
    }), // 후원한 포인트
  requestId: z.bigint().nullish(),
});

export const constant = {
  minRequestFunding: 1000,
  minCoFunding: 200,
  requestFundingStep: 100,

  statusKor: new Map<RequestFundingStatus, string>([
    ['FUNDING', '펀딩 중'],
    ['COMPLETION', '펀딩 완료'],
    ['CANCELED', '펀딩 취소'],
    ['REFUND', '환불됌'],
  ]),
};

export const utils = {
  sumFundings(fundings: RequestFunding[]) {
    return fundings.reduce((total, { quantity }) => total + quantity, 0);
  },
  // 후원자가 많은 순으로 정렬
  quantityAmountDesc: _quantityAmountDesc,
  // 유저별로 펀딩 그루핑
  groupByFundingUsers<T extends RequestFundingIncludeUser>(
    fundingIncludeUser: T[],
  ) {
    return [
      ...fundingIncludeUser
        .reduce((acc, cur) => {
          const userId = cur.user?.id ?? null;
          const userFunding = acc.get(userId);
          if (userFunding) {
            userFunding.quantity += cur.quantity;
          } else {
            acc.set(userId, { ...cur });
          }
          return acc;
        }, new Map<User['id'] | null, T>())
        .values(),
    ];
  },
};
