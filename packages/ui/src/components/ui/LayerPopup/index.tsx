import CloseIcon from '@assets/icon/close.svg';
import Button from '@components/ui/Button';
import type {
  PopoverContentProps,
  PopoverTriggerProps,
} from '@radix-ui/react-popover';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import React from 'react';

import styles from './LayerPopup.module.css';

export interface LayerPopupProps
  extends Omit<Popover.PopoverProps, 'children'> {
  Trigger: PopoverTriggerProps;
  Content: PopoverContentProps;
}

export default function LayerPopup({
  Trigger,
  Content: { children, ...Content },
  ...props
}: LayerPopupProps) {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger asChild {...Trigger} />
      <Popover.Content
        sideOffset={8}
        className={clsx(styles.contentBasic, Content.className)}
        {...Content}
      >
        {children}
        <Button theme="transparent" className="absolute right-8 top-8">
          <CloseIcon />
        </Button>
      </Popover.Content>
    </Popover.Root>
  );
}
