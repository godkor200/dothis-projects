export const CONVERT_SUBSCRIBERANGE = {
  '1000~10000': '구독자 천명 이상 만명 미만의 채널',
  '10000~50000': '구독자 만명 이상 5만명 미만의 채널',
  '50000~100000': '구독자 5만명 이상 10만명 미만의 채널',
  '100000~500000': '구독자 10만 이상 50만명 미만의 채널',
  '500000이상': '구독자 50만명 이상의 채널',
};

export type VideoCount =
  | '1000~10000'
  | '10000~50000'
  | '50000~100000'
  | '100000~500000'
  | '500000이상';

interface ResponseItem {
  id: string;
  label: string;
  value: number;
}

export type ResponseType = {
  [key in VideoCount]: ResponseItem;
};
