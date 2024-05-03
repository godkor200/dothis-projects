import type { MouseEvent } from 'react';

import SvgComp from '@/components/common/SvgComp';

interface Props {
  link: string;
}
const ShareButton = ({ link }: Props) => {
  const handleCopy = (e: MouseEvent<HTMLDivElement>, link: string) => {
    e.preventDefault();

    alert(`${link}가 복사`);
  };
  return (
    <div onClick={(e) => handleCopy(e, link)}>
      <div className="bg-grey200 flex w-full items-center justify-center   rounded-lg py-4 text-center">
        <button className="inline-flex items-center gap-[0.7rem]">
          <SvgComp icon="Share" size={20} />
          <p className="text-grey700 font-bold">공유하기</p>
        </button>
      </div>
    </div>
  );
};

export default ShareButton;

const ShareButtonSkeleton = () => {
  return (
    <div>
      <div className="bg-grey300 flex h-[58px] w-full items-center   justify-center rounded-lg py-4 text-center">
        <button className="inline-flex items-center gap-[0.7rem]"></button>
      </div>
    </div>
  );
};
