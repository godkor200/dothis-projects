import type { BoxProps, MenuProps } from '@chakra-ui/react';
import { Box, Menu } from '@chakra-ui/react';
import { css } from '@emotion/react';

import { colors, fontWeights, shadows } from '../../../lib/styles/chakraTheme';
import commonStyle from '../../../lib/styles/commonStyle';

type Theme = 'gray' | 'transparent';

type Props = MenuProps & {
  theme: Theme;
  width?: BoxProps['width'];
};

const SelectMenu = ({ theme, width = 'auto', ...props }: Props) => (
  <Box css={style} className={theme} width={width}>
    <Menu placement="bottom-start" strategy="fixed" {...props} />
  </Box>
);

const style = css`
  .ui_select-menu-list {
    max-height: 220px;
    overflow-y: auto;
    ${commonStyle.scrollBarHidden};
    box-shadow: ${shadows.base};

    button {
      display: flex;
      align-items: center;
      border-radius: 0;

      &[aria-checked='true'] {
        font-weight: ${fontWeights.sb};
      }
    }
  }

  .ui_select-menu-button {
    display: block;
    width: 100%;

    &.--invalid {
    }

    .ui_menu-button_button-contents {
      display: flex;
    }

    .ui_menu-button_icon-arrow-down {
      margin-left: auto;
      transition: 0.15s transform;
    }

    &[aria-expanded='true'] {
      .ui_menu-button_icon-arrow-down {
        transform: rotateZ(-180deg);
      }
    }
  }

  &.gray {
    .ui_select-menu-list {
      border-radius: 12px;

      button {
        padding-left: 16px;
        padding-right: 16px;
        height: 48px;

        ${commonStyle.grayBox};
        border-radius: 0;
      }
    }

    .ui_select-menu-button {
      ${commonStyle.grayBox};
      min-height: 48px;
      padding-right: 16px;
      padding-left: 16px;

      &.--invalid {
        ${commonStyle.invalidBorderStyle};
      }
    }
  }

  &.transparent {
    font-size: 14px;
    color: ${colors.gray['90']};

    .ui_select-menu-list {
      box-shadow: ${shadows.base};
      border-radius: 2px;

      button {
        background: ${colors.white};
        padding: 8px 16px;

        &:hover,
        &:focus-within {
          background: ${colors.bg.dark};
        }
      }
    }

    .ui_select-menu-button {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 2px;

      .ui_menu-button_icon-arrow-down {
        fill: ${colors.gray['50']};
      }

      &[aria-expanded='true'] {
        .ui_menu-button_icon-arrow-down {
          fill: ${colors.gray['70']};
        }
      }
    }
  }
`;

export default SelectMenu;
