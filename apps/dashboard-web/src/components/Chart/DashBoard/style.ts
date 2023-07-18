import { theme } from '@dothis/theme/dashboard';
import { px2rem } from '@dothis/theme/utils/unit';
import { styled } from 'styled-components';

/* Summary */
export const SummaryList = styled.ul`
  display: flex;
  gap: ${px2rem(22)};
`;

export const SummaryWrapper = styled.li`
  flex: 1;
  min-width: ${px2rem(300)};
  padding: ${px2rem(20)} 0;
  border-radius: ${px2rem(8)};
  background-color: ${theme.colors.primary50};
`;

export const Border = styled.div`
  padding-left: ${px2rem(25)};
  border-left: ${px2rem(2)} solid ${theme.colors.primary500};
`;

export const SummaryTitle = styled.div`
  margin-bottom: ${px2rem(4)};
  font-weight: 700;
  color: ${theme.colors.grey600};
`;

export const Content = styled.div`
  font-size: ${px2rem(26)};
  font-weight: 700;
  color: ${theme.colors.primary500};
`;

/* DailyView */
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: fit-content;
  margin-top: ${px2rem(40)};
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
