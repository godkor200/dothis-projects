'use client';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import Calendar from './Calendar';
import CalendarTest from './CalendarTest';

const CalendarContainer = () => {
  const [createdDate, setCreatedDate] = useState<Dayjs>(dayjs());

  const [uploadDate, setUploadDate] = useState<Dayjs | null>(null);

  const handleSetCreatedDate = (date: string) => {
    setCreatedDate(dayjs(date));
  };

  const handleSetUploadDate = (date: string) => {
    setUploadDate(dayjs(date));
  };

  const isInvalidStartDate = (date: Dayjs) => date.isAfter(uploadDate, 'day');

  const isInvalidEndDate = (date: Dayjs) => date.isBefore(createdDate, 'day');

  const [selectedDate1, setSelectedDate1] = useState(dayjs());

  const [selectedDate2, setSelectedDate2] = useState<Dayjs | null>(null);

  const handleSelected1 = (date: string) => {
    setSelectedDate1(dayjs(date));
  };

  const handleSelected2 = (date: string) => {
    setSelectedDate2(dayjs(date));
  };

  // console.log(selectedDate1);
  return (
    <div>
      테스트를 위한 캘린더 컨테이너
      {/* <Calendar
        type={createdDate.format('YYYY-MM-DD')}
        setType={handleSetCreatedDate}
        setOpenDrop={() => {}}
        isInvalidate={isInvalidStartDate}
      />
      <Calendar
        type={uploadDate?.format('YYYY-MM-DD') || '0'}
        setType={handleSetUploadDate}
        setOpenDrop={() => {}}
        isInvalidate={isInvalidEndDate}
      /> */}
      <CalendarTest
        calendarbaseDate={dayjs().format('YYYY-MM-DD')}
        selectedDate={selectedDate1.format('YYYY-MM-DD')}
        setSelectedDate={handleSelected1}
        setOpenDrop={() => {}}
        isInvalidate={isInvalidEndDate}
        test={selectedDate1}
      />
      <CalendarTest
        calendarbaseDate={selectedDate1.format('YYYY-MM-DD')}
        selectedDate={
          selectedDate2 ? selectedDate2.format('YYYY-MM-DD') : selectedDate2
        }
        setSelectedDate={handleSelected2}
        setOpenDrop={() => {}}
        isInvalidate={isInvalidEndDate}
        test={selectedDate1}
      />
    </div>
  );
};

export default CalendarContainer;
