import type { MenuButtonProps } from '@chakra-ui/react';
import { forwardRef, MenuButton } from '@chakra-ui/react';
import clsx from 'clsx';

import { SvgArrowDown } from '../Icons';


type Props = MenuButtonProps & {
  isInvalid?: boolean;
};
export const SelectMenuButton = forwardRef<Props, 'button'>(
  ({ children, isInvalid, ...props }, ref) => {
    return (
      <MenuButton
        className={clsx('ui_select-menu-button', isInvalid && '--invalid')}
        type="button"
        ref={ref}
        {...props}
      >
        <span className="ui_menu-button_button-contents">
          {children}
          <SvgArrowDown className="ui_menu-button_icon-arrow-down" />
        </span>
      </MenuButton>
    );
  },
);