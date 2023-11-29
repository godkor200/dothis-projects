'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';

import SvgComp from '@/components/common/SvgComp';

const TermsModal = ({
  errorMessage,
  setOnError,
}: {
  errorMessage: string | undefined;
  setOnError: (trigger: boolean) => void;
}) => {
  function replaceWithBr() {
    return errorMessage?.replace(/\n/g, '<br />');
  }
  return (
    <div className=" bg-grey00 border-grey400 w-[320px] rounded-[8px] border border-solid p-10">
      <div className="mb-[0.625rem] flex justify-center">
        <SvgComp icon="Alert" size={24} />
      </div>
      <p
        className="text-t3 text-grey700 mb-5 text-center font-bold"
        dangerouslySetInnerHTML={{ __html: replaceWithBr() as string }}
      ></p>
      <div
        className="flex justify-center gap-[1.25rem] "
        onClick={() => setOnError(false)}
      >
        <Button theme="contained" size="L" paddingX="!px-[85px]">
          확인
        </Button>
      </div>
    </div>
  );
};

export default TermsModal;
