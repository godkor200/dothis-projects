'use client';

import CheckboxContainer from '@/components/common/Checkbox';

const CumulativeVideoChartFilter = () => {
  return (
    <div className="flex gap-[1.5rem] ml-auto ">
      <CheckboxContainer
        isChecked={true}
        onChange={() => console.log('checked1')}
        id={'1'}
      >
        <div className="flex items-center gap-[0.5rem]">
          <CheckboxContainer.Checkbox />
          <CheckboxContainer.Label>
            구독자 수 비슷한 채널
          </CheckboxContainer.Label>
        </div>
      </CheckboxContainer>

      <CheckboxContainer
        isChecked={false}
        onChange={() => console.log('checked2')}
        id={'2'}
      >
        <div className="flex items-center gap-[0.5rem]">
          <CheckboxContainer.Checkbox />
          <CheckboxContainer.Label>
            구독자 10만 이상 채널
          </CheckboxContainer.Label>
        </div>
      </CheckboxContainer>

      <CheckboxContainer
        isChecked={false}
        onChange={() => console.log('checked3')}
        id={'3'}
      >
        <div className="flex items-center gap-[0.5rem]">
          <CheckboxContainer.Checkbox />
          <CheckboxContainer.Label>그 외</CheckboxContainer.Label>
        </div>
      </CheckboxContainer>
    </div>
  );
};

export default CumulativeVideoChartFilter;
