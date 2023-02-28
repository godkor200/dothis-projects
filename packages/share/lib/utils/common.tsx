import type { ComponentType } from 'react';

export function isNil(v: unknown) {
  return v === undefined || v === null;
}

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

// 다른 props로 부터 해당 컴포넌트의 props를 생성
export const ChangeProps =
  <A extends {}>(_Component: ComponentType<A>) =>
  <OtherProps,>(makeArgsFn: (a: OtherProps) => A) => {
    const Component = (props: OtherProps) => {
      return <_Component {...makeArgsFn(props)} />;
    };
    Component.displayName = _Component.displayName;

    return Component;
  };
