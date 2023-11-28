import { Button } from 'dashboard-storybook/src/components/Button/Button';

import SvgComp from '../../SvgComp';

/**
 * 기획단에서 논의가 필요해서 callback은 달아주지 못하였습니다.
 * @param dismissCallback 해당 컴포넌트를 닫기를 눌렀을 때 처리되는 callback
 * @returns
 */
const RelwordErrorModal = ({
  dismissCallback,
}: {
  dismissCallback: () => void;
}) => {
  return (
    <div className=" rounded-8 bg-grey00 border-grey400 w-[500px] border border-solid p-10">
      <div className="flex justify-end" onClick={() => dismissCallback()}>
        <SvgComp icon="Close" size={24} />
      </div>
      <p className="text-t3 text-grey700 mb-5 text-center font-bold">
        키워드에 대한 연관어를 가져오지 못하였습니다.
        <br />
        해당 키워드를 제거하시겠습니까?
      </p>
      <div className="flex justify-center gap-[1.25rem]">
        <Button theme="contained" size="L">
          제거
        </Button>

        <Button theme="outlined" size="L" onClick={() => dismissCallback()}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default RelwordErrorModal;
