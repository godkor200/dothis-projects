import type { ComponentType, JSXElementConstructor } from 'react';
import React from 'react';

// 부분적으로 props 적용
export const PartialProps =
  <A extends {}>(BaseComponent: ComponentType<A>, name?: string) =>
  <V extends Partial<A>>(partialProps: V) => {
    const AppliedComponent: ComponentType<Omit<A, keyof V>> = (restProps) => {
      const totalArgs = Object.assign(
        {},
        partialProps,
        restProps,
      ) as unknown as A;
      const DerivedElement = <BaseComponent {...totalArgs} />;
      return DerivedElement;
    };
    Object.assign(AppliedComponent, BaseComponent, {
      name: name ?? BaseComponent?.displayName,
    });

    return AppliedComponent;
  };
// 다른 props로 부터 해당 컴포넌트의 props를 생성
export const ChangeProps =
  <A extends {}>(BaseComponent: ComponentType<A>, name?: string) =>
  <OtherProps,>(makeArgsFn: (a: OtherProps) => A) => {
    const AppliedComponent: ComponentType<OtherProps> = (props: OtherProps) => {
      const DerivedElement = <BaseComponent {...makeArgsFn(props)} />;
      return DerivedElement;
    };
    Object.assign(AppliedComponent, BaseComponent, {
      name: name ?? BaseComponent?.displayName,
    });

    return AppliedComponent;
  };
