import styled from 'styled-components';

export const RelatedWordItem = styled.li`
  display: flex;
  align-items: center;
  padding: 9px 20px;
  border-radius: 4px;
  background-color: #ffffff;
  color: #71717a;
  transition: all 100ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #ff647d;
    color: #ffffff;

    path {
      stroke: #ffffff;
    }
  }
`;

export const Rank = styled.div`
  width: 20px;
  margin-right: 6px;
  font-weight: 700;
`;

export const RankContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

export const Word = styled.div`
  width: 70px;
  margin-right: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Gap = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
`;

export const Views = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
