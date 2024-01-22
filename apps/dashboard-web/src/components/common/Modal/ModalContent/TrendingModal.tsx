import { Button } from 'dashboard-storybook/src/components/Button/Button';
import Link from 'next/link';

import { useModalActions } from '@/store/modalStore';

import SvgComp from '../../SvgComp';

const TrendingModal = ({ keyword }: { keyword: string }) => {
  const { setOpen } = useModalActions();

  return (
    <div className=" rounded-8 bg-grey00 border-grey400 w-[500px] border border-solid p-10">
      <div className="flex justify-end" onClick={() => setOpen(false)}>
        <SvgComp icon="Close" size={24} />
      </div>
      <p className="text-t3 text-grey700 mb-5 text-center font-bold">
        자세한 분석을 위해 페이지를 이동합니다.
      </p>

      <div className="flex justify-center gap-[1.25rem]">
        <Button theme="outlined" size="L" onClick={() => setOpen(false)}>
          취소
        </Button>
        <Link
          href={`/contents?keyword=${keyword}`}
          onClick={() => setOpen(false)}
        >
          <Button theme="contained" size="L">
            이동
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default TrendingModal;
