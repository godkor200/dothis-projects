import React from "react";
import clsx from 'clsx';
import * as HeadlessSwitch from '@radix-ui/react-switch';
import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';

import styles from "./Switch.module.css";

type Props = {
  theme?: 'primary' | 'secondary';
  className?: string;
}

const Switch = polymorphicForwardRefPropsAsIs(HeadlessSwitch.Root)<Props>()(
  ({checked, theme = 'primary', className, ...props}, ref) => {

    return (
      <HeadlessSwitch.Root
      {...props}
      data-theme={theme}
      className={
        clsx(styles.root, className)
      }
      ref={ref}
    >
      <HeadlessSwitch.Thumb />
    </HeadlessSwitch.Root>
    )
  }
);

export default Switch;