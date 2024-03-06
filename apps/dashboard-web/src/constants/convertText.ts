export const CONVERT_SUBSCRIBERANGE = {
  '1000~9999': '구독자 천명 이상 만명 미만의 채널',
  '10000~49999': '구독자 만명 이상 5만명 미만의 채널',
  '50000~99999': '구독자 5만명 이상 10만명 미만의 채널',
  '100000~499999': '구독자 10만 이상 50만명 미만의 채널',
  '500000이상': '구독자 50만명 이상의 채널',
};

export type VideoCount =
  | '1000~9999'
  | '10000~49999'
  | '50000~99999'
  | '100000~499999'
  | '500000이상';

interface ResponseItem {
  id: string;
  label: string;
  value: number;
}

export type ResponseType = {
  // [key in VideoCount]: ResponseItem;
  [key in VideoCount]: number;
};
