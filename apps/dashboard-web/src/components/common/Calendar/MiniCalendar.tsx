'use client';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import createCalendar from '@/utils/createCalendar';

import SvgComp from '../SvgComp';
import * as Style from './styles';

interface Props {
  calendarbaseDate: string;
  selectedDate: string | null;
  setSelectedDate: (value: string) => void;
  isInvalidate?: (date: Dayjs) => boolean;
  dateFormat?: string;
}

const MiniCalendar = ({
  calendarbaseDate,
  selectedDate,
  setSelectedDate,
  isInvalidate,
  dateFormat = 'YYYY-MM-DD',
}: Props) => {
  const [baseDate, setBaseDate] = useState(dayjs(calendarbaseDate, dateFormat));

  useEffect(() => {
    setBaseDate(dayjs(calendarbaseDate, dateFormat));
  }, [calendarbaseDate]);

  const calendarArray = createCalendar(baseDate);

  const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDate = (date: Dayjs) => {
    setSelectedDate(date.format(dateFormat));
  };

  const decreaseMonth = () => {
    setBaseDate((prev) => prev.subtract(1, 'month'));
  };

  const increaseMonth = () => {
    setBaseDate((prev) => prev.add(1, 'month'));
  };

  return (
    <Style.Calendar>
      <Style.DateTitle>
        <Style.ArrowIcon onClick={decreaseMonth}>
          <SvgComp icon="KeywordLeftArrow" size={18} />
        </Style.ArrowIcon>
        <Style.Date>
          {`${baseDate.year()}년 ${baseDate.month() + 1}월`}
        </Style.Date>

        <Style.ArrowIcon onClick={increaseMonth}>
          <SvgComp icon="KeywordRightArrow" size={18} />
        </Style.ArrowIcon>
      </Style.DateTitle>
      <Style.DayTitle>
        {DAY_LIST.map((day, i) => (
          <Style.DayType isSunday={i === 0} key={i}>
            {day}
          </Style.DayType>
        ))}
      </Style.DayTitle>
      {calendarArray.map((week) => {
        return (
          <Style.Week key={week[0].format(dateFormat)}>
            {week.map((date, i) => {
              const isInvalid = isInvalidate && isInvalidate(date);
              return (
                <Style.Day
                  isOtherMonth={date.month() !== baseDate.month()}
                  isToday={date.isSame(dayjs(), 'day')}
                  isSelected={selectedDate === date.format(dateFormat)}
                  isSunday={i === 0}
                  isInvalid={isInvalid}
                  onClick={() => {
                    if (isInvalid) return;
                    handleDate(date);
                  }}
                  key={date.format(dateFormat)}
                >
                  {date.date()}
                </Style.Day>
              );
            })}
          </Style.Week>
        );
      })}
    </Style.Calendar>
  );
};

export default MiniCalendar;
