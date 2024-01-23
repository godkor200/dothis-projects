import { Button } from 'dashboard-storybook/src/components/Button/Button';

import { useModalActions } from '@/store/modalStore';

const RelatedRetryModal = ({
  dismissCallback,
}: {
  dismissCallback: () => void;
}) => {
  return (
    <div className=" rounded-8 bg-grey00 w-[500px] p-10">
      <p className="text-t3 text-grey700 mb-5 text-center font-bold">
        많은 요청으로 인해 <br /> 데이터를 가져오는데 실패하였습니다
      </p>
      <div className="flex justify-center gap-[1.25rem]">
        <Button theme="outlined" size="L" onClick={dismissCallback}>
          재시도
        </Button>
      </div>
    </div>
  );
};

export default RelatedRetryModal;
