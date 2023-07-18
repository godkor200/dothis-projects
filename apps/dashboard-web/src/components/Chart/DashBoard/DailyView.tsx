'use client';

import * as Style from './style';

interface DailyViewProps {
  view: number;
}

const DailyView = ({ view }: DailyViewProps) => {
  return (
    <Style.Wrapper>
      <Style.Title>일일 조회 수</Style.Title>
      <div>
        <Style.View>{view.toLocaleString('ko-KR')}</Style.View>회
      </div>
    </Style.Wrapper>
  );
};

export default DailyView;
