import { colors } from '@dothis/theme/dashboard/colors';
import styled, { css } from 'styled-components';

export const SideItemContainer = styled.div<{ $isInActive: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;

  width: 190px;
  height: 44px;

  border-radius: 10px;
  padding: 10px 0px 10px 12px;

  color: ${colors.grey600};

  font-weight: 700;

  font-size: 14px;

  ${({ $isInActive }) =>
    $isInActive &&
    css`
      background-color: ${colors.primary200};
      color: ${colors.primary600};
    `};

  ${({ theme, $isInActive }) => css`
    & path {
      fill: ${!$isInActive && theme.colors.grey00};
      stroke: ${!$isInActive && theme.colors.grey500};
    }
  `}
`;

export const IconItemContainer = styled.div<{ $isInActive: boolean }>`
  width: 54px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $isInActive }) =>
    $isInActive &&
    css`
      background-color: ${colors.primary200};
    `};

  ${({ theme, $isInActive }) => css`
    & path {
      fill: ${!$isInActive && theme.colors.grey00};
      stroke: ${!$isInActive && theme.colors.grey500};
    }
  `}
`;
