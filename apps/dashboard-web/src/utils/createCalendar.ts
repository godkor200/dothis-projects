import type { Dayjs } from 'dayjs';

const createCalendar = (baseDate: Dayjs, fixWeek: boolean = false) => {
  const WEEK = 7;

  const monthStart = baseDate.startOf('month');

  const monthEnd = baseDate.endOf('month');
  const startDay = monthStart.day();
  // 요일 가져오는 부분
  const endDate = monthEnd.date();
  const totalWeek = fixWeek ? 6 : Math.ceil((startDay + endDate) / 7);
  // 로우 갯수 계산

  const getFirstWeek = () => {
    const weekList = [];
    let date;
    for (let i = 0; i < WEEK; i++) {
      if (i < startDay) {
        date = monthStart.subtract(startDay - i, 'day');
      } else {
        date = monthStart.add(i - startDay, 'day');
      }
      weekList.push(date);
    }
    return weekList;
  };

  const getRestWeek = (i: number) => {
    const weekList = [];
    const startDate = (i - 1) * WEEK;
    let date;
    for (let j = startDate; j < startDate + WEEK; j++) {
      if (j - startDay < endDate) {
        date = monthStart.add(j - startDay, 'day');
      } else {
        date = monthEnd.add(j - endDate - startDay + 1, 'day');
      }
      weekList.push(date);
    }
    return weekList;
  };

  const makeMonthList = () => {
    const monthList = [];
    for (let i = 1; i <= totalWeek; i++) {
      if (i === 1) {
        monthList.push(getFirstWeek());
      } else {
        monthList.push(getRestWeek(i));
      }
    }
    return monthList;
  };

  return makeMonthList();
};

export default createCalendar;
