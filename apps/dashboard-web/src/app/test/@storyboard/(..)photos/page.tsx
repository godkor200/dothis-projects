'use client';

import type { Route } from 'next';
import Link from 'next/link';

import MiniCalendar from '@/components/common/Calendar/Calendar';

const PhotoPage = () => {
  return (
    <div className="text-yellow flex flex-col items-center gap-[40px]">
      <p className="text-[30px] font-bold text-black">
        스토리보드 리스트 페이지(퍼렐로)
      </p>

      <MiniCalendar
        setOpenDrop={() => {}}
        type="2024-01-05"
        setType={() => {}}
      />

      <Link href={`/photos/123`}>id로 이동</Link>
    </div>
  );
};

export default PhotoPage;
