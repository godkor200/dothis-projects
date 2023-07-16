import { styled } from 'styled-components';

export const SummaryList = styled.ul`
  display: flex;
  gap: 22px;
`;

export const Wrapper = styled.li`
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

export const Title = styled.div`
  margin-bottom: 4px;
  font-weight: 700;
  color: #71717a;
`;

export const Content = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #f0516d;
`;
