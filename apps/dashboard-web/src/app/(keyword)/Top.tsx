import type { Dispatch, SetStateAction } from 'react';

import SvgComp from '@/components/common/SvgComp';

import GNBSearchbar from './GNBSearchbar';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Top = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  return (
    <div className="border-b-1 border-b-grey400 flex items-center">
      <div className="mr-[66px] flex items-center gap-[53px]">
        <div className="my-[24px] ml-[28px] flex items-center gap-[8px] ">
          <SvgComp icon="SideLogo" size={30} />
          <SvgComp icon="LogoTitle" width={100} height={40} />
        </div>

        <SvgComp
          icon="ArrowLeft"
          size={24}
          style={{
            transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          className="cursor-pointer"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>

      <GNBSearchbar />
    </div>
  );
};

export default Top;
