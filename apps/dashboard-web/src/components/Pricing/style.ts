import styled from 'styled-components';

export const Price = styled.table`
  width: 1204px;
  text-align: center;
  white-space: nowrap;

  th {
    width: 206px;
    height: 60px;
    font-size: 30px;
    padding: 20px;
  }

  td {
    width: 206px;
    height: 60px;
    font-size: 24px;
    padding: 20px;
  }
`;

export const PriceButton = styled(Price)`
  margin-top: 90px;

  th {
    border-bottom: 1px solid #e4e4e7;
    border-collapse: collapse;
  }

  button {
    width: 270px;
    height: 56px;
    border-radius: 8px;
    background-color: #f0516d;
    color: white;
    font-size: 16px !important;

    &:hover {
      background-color: ${({ theme }) => theme.colors.grey300};
      color: black;
    }
  }
`;

export const PriceDetail = styled(Price)`
  margin-top: 40px;

  thead {
    font-size: 30px;
    height: 40px !important;

    td,
    th {
      width: 206px;
      font-size: 30px;
    }
  }

  tbody {
    th {
      width: 206px;
      height: 60px;
      font-size: 18px;
      font-weight: 600;
      text-align: left !important;
    }

    tr {
      &:hover {
        background-color: ${({ theme }) => theme.colors.grey300};
      }
      &:hover td {
        background-color: ${({ theme }) => theme.colors.grey300};
      }
    }

    td {
      width: 286px;
      background-color: #fafafa;
      height: 60px;
      font-size: 16px;
    }
  }
`;

export const Th_subtitle = styled.th`
  width: 206px;
  height: 60px;
  border-bottom: 1px solid #e4e4e7;
  border-collapse: collapse;
  font-size: 24px !important;
  font-weight: 700 !important;
  text-align: left !important;
`;

export const Th_start = styled.th`
  width: 206px;
  height: 60px;
  font-size: 24px !important;
  text-align: left !important;
`;

export const Td_start = styled.td`
  width: 206px;
  height: 60px;
  font-size: 20px !important;
  text-align: left !important;
  font-weight: 600 !important;
`;

export const Best_top = styled.th`
  position: relative;
  border-top: 1px solid #f0516d;
  border-left: 1px solid #f0516d;
  border-right: 1px solid #f0516d;
  border-collapse: collapse;
`;

export const Best_mid = styled.td`
  border-left: 1px solid #f0516d;
  border-right: 1px solid #f0516d;
  border-collapse: collapse;
`;

export const Best_bottom = styled.td`
  border-left: 1px solid #f0516d;
  border-right: 1px solid #f0516d;
  border-bottom: 1px solid #f0516d;
  border-collapse: collapse;
`;

export const Best_name = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 20px !important;
  background-color: #f0516d;
  color: white;
  width: 100%;
  height: 30px;
`;

export const Main = styled.main`
  white-space: nowrap;
  margin-left: 2rem;
  margin-bottom: 100px;
  overflow: hidden;
  font-weight: bold;

  h2 {
    font-size: 30px;
    margin-top: 60px;
  }
  p {
    font-size: 28px;
  }
`;

export const Pink = styled.span`
  font-size: inherit;
  color: #f0516d;
`;

export const Icon = styled.img`
  width: auto;
  height: auto;
`;

export const IconContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
