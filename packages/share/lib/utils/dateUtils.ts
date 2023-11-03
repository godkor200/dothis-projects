import format from 'date-fns/format';
import getISODay from 'date-fns/getISODay';

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
  return format(date, 'yyyy-MM-dd') + 'T' + format(date, 'HH:mm:ss');
}

export function toKoAboutDateAgo(nowDate: Date, pastDate: Date) {
  const diff = nowDate.getTime() - pastDate.getTime();

  if (diff < minutes) return '지금';
  if (diff < hours) return Math.floor(diff / minutes) + '분 전';
  if (diff < day) return Math.floor(diff / hours) + '시간 전';
  if (diff < month) return Math.floor(diff / day) + '일 전';
  return Math.floor(diff / month) + '달 전';
}
