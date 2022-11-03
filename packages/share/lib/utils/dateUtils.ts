import { format, getISODay } from 'date-fns/fp';

const second = 600;
const minutes = 60 * second;
const hours = 60 * minutes;
const day = 24 * hours;
const month = 30 * day;

export const KOR_DAY_OF_WEEK = [
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
  '일',
] as const;

export function toKoDayOfWeek(date: Date) {
  return KOR_DAY_OF_WEEK[getISODay(date) - 1];
}
export function formatLocalISO(date: Date) {
  return format('yyyy-MM-dd')(date) + 'T' + format('HH:mm:ss')(date);
}

export function toKoAboutDateAgo(nowDate: Date, pastDate: Date) {
  const diff = nowDate.getTime() - pastDate.getTime();

  if (diff < minutes) return '지금';
  if (diff < hours) return Math.floor(diff / minutes) + '분 전';
  if (diff < day) return Math.floor(diff / hours) + '시간 전';
  if (diff < month) return Math.floor(diff / day) + '일 전';
  return Math.floor(diff / month) + '달 전';
}

// yyyy.MM.dd
export const toDateString = (separator = '.') =>
  format(`yyyy${separator}MM${separator}dd`);
// MM.dd
export const toMonthDate = (separator = '.') => format(`MM${separator}dd`);
// yyyy.MM
export const toYearMonth = (separator = '.') => format(`yyyy${separator}MM`);

export const toKoMonthDay = format('MM월 dd일');
export const toKoMonth = format('MM월');

