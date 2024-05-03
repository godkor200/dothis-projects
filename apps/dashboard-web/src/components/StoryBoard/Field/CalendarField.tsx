'use client';

import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import MiniCalendar from '@/components/common/Calendar/MiniCalendar';

interface CalendarFieldProps {
  inputProps: React.HTMLProps<HTMLInputElement>;
  label?: string;
  defaultDate?: string;
  handleSelectDate?: (value: string) => void;
  validAfterDate?: string;
}

const CalendarField = ({
  inputProps,
  label,
  defaultDate = new Date().toLocaleDateString(),
  handleSelectDate = () => {},
  validAfterDate,
}: CalendarFieldProps) => {
  const [show, setShow] = useState<boolean>(false);

  const isValidEndDate = (date: Dayjs) => {
    const validAfter =
      validAfterDate && validAfterDate.includes('.')
        ? formatYYMMDDtoDate(validAfterDate).toDateString()
        : validAfterDate;
    return validAfter ? date.isAfter(validAfter, 'day') : true;
  };

  const formatDateToYYMMDD = (date: Date) => {
    const year = date.getFullYear().toString().slice(2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}.${month}.${day}`;
  };

  const formatYYMMDDtoDate = (dateString: string) => {
    const parts = dateString.split('.');
    const year = parseInt(parts[0], 10) + 2000;
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    return new Date(year, month, day);
  };

  useEffect(() => {
    handleSelectDate(
      defaultDate.includes('.')
        ? defaultDate
        : formatDateToYYMMDD(new Date(defaultDate)),
    );
  }, [defaultDate]);

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        {...inputProps}
        onFocus={(e) => {
          inputProps.onFocus?.(e);
          setShow(true);
        }}
        className="border-none text-center focus:outline-none font-bold"
      />
      <div
        className={clsx('absolute z-[2] translate-y-[50px]', !show && 'hidden')}
      >
        <MiniCalendar
          calendarbaseDate={
            defaultDate.includes('.')
              ? formatYYMMDDtoDate(defaultDate).toDateString()
              : defaultDate
          }
          selectedDate={defaultDate}
          setSelectedDate={async (value: string) => {
            handleSelectDate(value);
            setShow(false);
          }}
          isInvalidate={(date: any) => {
            return !isValidEndDate(date);
          }}
          dateFormat="YY.MM.DD"
        />
      </div>
    </div>
  );
};

export default CalendarField;
