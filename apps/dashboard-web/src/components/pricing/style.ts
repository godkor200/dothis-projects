import styled from 'styled-components';

export const Price = styled.table`
  width: 1204px;
  text-align: center;
  white-space: nowrap;

  tr {
    gap: 20px;
  }

  th {
    width: 306px;
    height: 90px;
    font-size: 36px;
  }

  td {
    width: 306px;
    height: 90px;
    font-size: 26px;
    padding: 20px;
  }
`;

export const PriceButton = styled(Price)`
  margin-top: 120px;

  th {
    border-bottom: 1px solid #e4e4e7;
    border-collapse: collapse;
  }

  button {
    width: 286px;
    height: 56px;
    border-radius: 8px;
    background-color: #f0516d;
    color: white;
    font-size: 16px !important;

    &:hover {
      background-color: gray;
      color: black;
    }
  }
`;

export const PriceDetail = styled(Price)`
  margin-top: 40px;

  thead {
    font-size: 36px;
    height: 40px !important;

    td {
      width: 206px;
      font-size: 36px;
    }
  }

  tbody {
    th {
      width: 206px;
      height: 90px;
      font-size: 20px;
      font-weight: 600;
      text-align: left !important;
      padding: 20px 0px 20px 24px !important;
    }

    td {
      background-color: #fafafa;
      height: 90px;
      font-size: 16px;
      padding: 10px;
    }
  }
`;
export const Th_subtitle = styled.th`
  width: 206px;
  height: 90px;
  border-bottom: 1px solid #e4e4e7;
  border-collapse: collapse;
  font-size: 28px !important;
  font-weight: 700 !important;
  text-align: left !important;
  padding: 20px 0px 20px 24px !important;
`;

export const Th_start = styled.th`
  width: 206px;
  height: 90px;
  font-size: 28px !important;
  text-align: left !important;
  padding: 20px 0px 20px 24px !important;
`;

export const Td_start = styled.td`
  width: 206px;
  height: 90px;
  font-size: 20px !important;
  text-align: left !important;
  padding: 20px 0px 20px 24px !important;
  font-weight: normal !important;
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
  overflow: hidden;
  font-weight: bold;

  h2 {
    font-size: 36px;
    margin-top: 90px;
  }
  p {
    font-size: 28px;
  }
`;

export const Pink = styled.span`
  font-size: inherit;
  color: #f0516d;
`;

export const ImageBox = styled.div`
  width: 1600px;
  margin: 58px 130px 100px 0;
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
