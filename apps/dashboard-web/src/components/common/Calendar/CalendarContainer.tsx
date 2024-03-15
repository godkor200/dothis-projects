'use client';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import Calendar from './Calendar';

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

  return (
    <div>
      테스트를 위한 캘린더 컨테이너
      <Calendar
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
      />
    </div>
  );
};

export default CalendarContainer;
