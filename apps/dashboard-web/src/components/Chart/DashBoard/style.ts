import { theme } from '@dothis/theme/dashboard';
import { px2rem } from '@dothis/theme/utils/unit';
import { styled } from 'styled-components';

/* Summary */
export const SummaryList = styled.ul`
  display: flex;
  gap: 22px;
`;

export const SummaryWrapper = styled.li`
  flex: 1;
  min-width: 300px;
  padding: 20px 0;
  border-radius: 8px;
  background-color: #fef7f8;
`;

export const Border = styled.div`
  padding-left: 25px;
  border-left: 2px solid #f0516d;
`;

export const SummaryTitle = styled.div`
  margin-bottom: 4px;
  font-weight: 700;
  color: #71717a;
`;

export const Content = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #f0516d;
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
