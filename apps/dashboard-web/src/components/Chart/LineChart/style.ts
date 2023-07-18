import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 460px;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
`;

export const ChartContainer = styled.div`
  width: 90%;
  height: 50%;

  & svg {
    overflow: visible;
  }
`;
