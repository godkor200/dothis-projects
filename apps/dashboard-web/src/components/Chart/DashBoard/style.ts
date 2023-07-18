import { theme } from '@dothis/theme/dashboard';
import { px2rem } from '@dothis/theme/utils/unit';
import { styled } from 'styled-components';

/* DailyView */
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${px2rem(300)};
  padding: ${px2rem(24)};
  font-weight: 700;
  border: 1px solid ${theme.colors.grey400};
  border-radius: ${px2rem(8)};
  background-color: ${theme.colors.grey00};
`;

export const Title = styled.div`
  color: ${theme.colors.grey600};
`;

export const View = styled.span`
  color: ${theme.colors.primary500};
`;
