import type { MenuButtonProps, MenuProps } from '@chakra-ui/react';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

import Button from '../../../components/ui/Button';
import { colors, fontWeights } from '../../../lib/styles/chakraTheme';

type Props = {
  menuItems: Array<
    | { text: string; Icon?: ReactNode; onClick?: () => void }
    | null
    | undefined
    | false
  >;
  children: ReactNode;
  buttonProps?: MenuButtonProps;
} & Omit<MenuProps, 'children'>;

const ActionMenu = ({ menuItems, children, buttonProps, ...props }: Props) => {
  return (
    <Menu placement="bottom-end" {...props}>
      <MenuButton as={Button} h="fit-content" w="fit-content" {...buttonProps}>
        {children}
      </MenuButton>
      <MenuList css={listStyle}>
        {menuItems.map((item, index) =>
          item ? (
            <MenuItem as={Button} key={item.text} onClick={item.onClick}>
              {item.Icon}
              <span className="ui_action-menu-text">{item.text}</span>
            </MenuItem>
          ) : undefined,
        )}
      </MenuList>
    </Menu>
  );
};
const listStyle = css`
  border: 1px solid ${colors.border['2']};
  background: ${colors.white};

  [role='menuitem'] {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    font-size: 14px;
    font-weight: ${fontWeights.m};
    background: ${colors.white};

    &:active {
      transform: none;
    }

    > * + .ui_action-menu-text {
      margin-left: 16px;
      margin-right: 16px;
    }
  }

  [role='menuitem'] + [role='menuitem'] {
    border-top: 1px solid ${colors.border['2']};
  }
`;
export default ActionMenu;
