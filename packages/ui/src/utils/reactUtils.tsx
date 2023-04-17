import type { ComponentRef } from 'react';
import type React from 'react';
import { forwardRef } from 'react';

// 기존 작성한 ViewProps에서 as를 분리한다.
export type AsProp<T extends React.ElementType> = {
  as?: T;
};

export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {},
> = React.ComponentPropsWithoutRef<T> &
  Props & {
    ref?: ComponentRef<T>;
  };

/**
 * make forwardRef component that inherits all props as-is
 *
 * @example
 * const MyInput = polymorphicForwardRefPropsAsIs('input')()
 * ((props, ref) => <input defaultValue="My Input" {...props} ref={ref} />);
 *
 * const MyWrappingInput = polymorphicForwardRefPropsAsIs(MyInput)<{myText: string}>()
 * (({ myText, ...props }, ref) => <div>
 *    Wrapping! {myText}
 *    <MyInput {...props} ref={ref} />
 * </div>);
 ***/
export const createPolymorphicComponentWithAllProps =
  <T extends React.ElementType = 'div'>(com: T) =>
  <ExtensionProps = {},>() =>
    forwardRef<
      ComponentRef<T>,
      React.ComponentPropsWithoutRef<T> & ExtensionProps
    >;

export const createPolymorphicComponent =
  <T extends React.ElementType = 'div'>(com: T) =>
  <props = {},>() =>
    forwardRef<ComponentRef<T>, props>;
