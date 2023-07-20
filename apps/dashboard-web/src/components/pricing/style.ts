import styled from 'styled-components';

export const PriceCategory = styled.table`
  width: 1600px;
  text-align: center;
  white-space: nowrap;
  margin-top: 120px;

  th {
    width: 360px;
    height: 220px;
    font-size: 36px;
    border-bottom: 1px solid #e4e4e7;
    border-collapse: collapse;
  }

  td {
    width: 360px;
    height: 100px;
    font-size: 26px;
    padding: 20px;
  }

  button {
    height: 56px;
    padding: 0 100px;
    border-radius: 8px;
    background-color: #f0516d;
    color: white;
    font-size: 16px !important;
  }
`;

export const Th_start = styled.th`
  width: 360px;
  font-size: 28px !important;
  text-align: left !important;
  padding: 20px 0px 20px 24px !important;
`;

export const Td_start = styled.td`
  width: 360px;
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
  padding: 30px 50px 0px 48px;
  margin-left: 98px;
  overflow: hidden;
  font-weight: bold;

  h2 {
    font-size: 36px;
    margin-top: 100px;
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
