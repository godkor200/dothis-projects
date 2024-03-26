import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import SvgComp from '@/components/common/SvgComp';
import {
  ArrowLeftButton,
  ArrowRightButton,
} from '@/components/MainContents/KeywordSearch/style';

interface Props {
  startDate: Dayjs;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const WeekDateSlider = ({ startDate, setStartDate }: Props) => {
  const handleIncreaseDate = () => {
    if (startDate.add(1, 'week').isSameOrAfter(dayjs(), 'day')) {
      return;
    }
    setStartDate((prev) => prev.add(1, 'week'));
  };

  const handleDecreaseDate = () => {
    if (startDate.subtract(1, 'week').isBefore('2024-01-01', 'day')) {
      return;
    }
    setStartDate((prev) => prev.subtract(1, 'week'));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <ArrowLeftButton onClick={handleDecreaseDate}>
          <SvgComp icon="KeywordLeftArrow" size="20px" />
        </ArrowLeftButton>

        <div className="border-grey400 rounded-8 flex items-center border px-4 py-2">
          <div className="">
            <SvgComp icon="Calendar" size="20px" />
          </div>

          <p className="text-grey600 px-2">{`${startDate.format(
            'YYYY-MM-DD',
          )} ~ ${startDate.add(6, 'day').format('YYYY-MM-DD')}`}</p>
        </div>
        <ArrowRightButton onClick={handleIncreaseDate}>
          <SvgComp icon="KeywordRightArrow" size="20px" />
        </ArrowRightButton>
      </div>
      {/* <p className="text-grey500 mt-[20px] text-[14px]">
        * 2024년 데이터부터 조회할 수 있습니다.
      </p> */}
    </>
  );
};

export default WeekDateSlider;
