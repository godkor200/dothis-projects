import { flow, pipe } from 'fp-ts/lib/function';
import type { ComponentType } from 'react';

import type { Merge } from '@/types/utils';

export function isNil(v: unknown) {
  return v === undefined || v === null;
}

export const strictlyOnlyRecordKey =
  <K extends string>() =>
  <S, T extends Record<K, S> & Record<Exclude<keyof T, K>, never>>(t: T) =>
    t;

// 부분적으로 props 적용
export const PartialProps =
  <A extends {}>(_Component: ComponentType<A>) =>
  <V extends Partial<A>>(partialProps: V) => {
    const Component = (restProps: Omit<A, keyof V>) => {
      const totalArgs = Object.assign(
        {},
        partialProps,
        restProps,
      ) as unknown as A;
      return <_Component {...totalArgs} />;
    };
    Component.displayName = _Component.displayName;

    return Component;
  };

// props를 받아 partial props를 반환하는 Lazy한 함수를 받아 props 합성
export const PartialApProps =
  <A extends {}>(_Component: ComponentType<A>) =>
  <OtherArgs, CalcArgs extends Partial<A>>(
    makeArgsFn: (a: OtherArgs) => CalcArgs,
  ) => {
    const Component = (args: Merge<Omit<A, keyof CalcArgs>, OtherArgs>) => {
      const totalArgs = Object.assign(
        {},
        args,
        makeArgsFn(args),
      ) as unknown as A;
      return <_Component {...totalArgs} />;
    };
    Component.displayName = _Component.displayName;

    return Component;
  };
