export type SubscriberRangeValue =
  | '1000to9999'
  | '10000to49999'
  | '50000to99999'
  | '100000to499999'
  | '500000to999999'
  | '1000000plus';

export const subscribersRangeOptions: {
  value: SubscriberRangeValue;
  label: string;
}[] = [
  { label: '1만 명 이하', value: '1000to9999' },
  { label: '1만 ~ 5만', value: '10000to49999' },
  { label: '5만 ~ 10만', value: '50000to99999' },
  { label: '10만 ~ 50만', value: '100000to499999' },
  { label: '50만 ~ 100만', value: '500000to999999' },
  { label: '100만 명 이상', value: '1000000plus' },
];

// export const subscribersRangeOptions: {
//   value: SubscriberRangeValue;
//   label: string;
// }[] = [
//   { label: '1만 명 이하', value: 1_000 + 'to' + 9_999 }, // "1_000to9_999"
//   { label: '1만 ~ 5만', value: 10_000 + 'to' + 49_999 }, // "10_000to49_999"
//   { label: '5만 ~ 10만', value: 50_000 + 'to' + 99_999 }, // "50_000to99_999"
//   { label: '10만 ~ 50만', value: 100_000 + 'to' + 499_999 }, // "100_000to499_999"
//   { label: '50만 ~ 100만', value: 500_000 + 'to' + 999_999 }, // "500_000to999_999"
//   { label: '100만 명 이상', value: 1_000_000 + 'plus' }, // "1_000_000plus"
// ];
