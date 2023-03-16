import type { PolymorphicComponentProps } from '@utils/reactUtils';
import { polymorphicForwardRef } from '@utils/reactUtils';
import clsx from 'clsx';
import React from 'react';

import style from './Input.Root.module.css';

type Props = Pick<
  PolymorphicComponentProps<'div'>,
  'className' | 'children' | 'onClick'
>;
const InputRoot = (props: Props) => {
  return <div {...props} />;
};

export default InputRoot;
