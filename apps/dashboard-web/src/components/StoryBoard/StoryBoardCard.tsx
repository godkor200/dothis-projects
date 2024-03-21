import React, { useState } from 'react';

import { VerticalThreeDotsIcon } from '../common/Icon/ThreeDots';
interface Props {
  storyBoardId: string;
  title: string;
  updatedAt: string;
}

const StoryBoardCard = ({ storyBoardId, title, updatedAt }: Props) => {
  const formatTime = (originalTime: string) => {
    const date = new Date(originalTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day}. ${hours}:${minutes}`;
  };

  const [hidden, setHidden] = useState(true);

  return (
    <div className="border-1 border-grey500 flex flex-col overflow-hidden rounded">
      <div className="bg-grey100 item-center relative flex">
        <div className="flex h-[143px] w-[274px]">thumbnail</div>
        <div
          className="absolute hover:bg-violet-600"
          style={{ transform: 'translateX(240px) translateY(10px)' }}
          onClick={(e) => {
            e.preventDefault();
            setHidden(!hidden);
          }}
        >
          <VerticalThreeDotsIcon />
          <div className={`absolute ${hidden && 'hidden'}`}>Dropdown 삭제</div>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-grey500 font-regular py-2 text-[12px]">
          {formatTime(updatedAt)}
        </p>
        <p className="text-grey900 truncate text-[16px] font-bold">{title}</p>
      </div>
    </div>
  );
};

export default StoryBoardCard;
