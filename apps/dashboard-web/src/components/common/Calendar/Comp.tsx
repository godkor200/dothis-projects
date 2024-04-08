'use client';

import PopperProvider from './PopperProvider';
import ToggleProvider from './TestProvider';

const CounterTest = () => {
  // Dialog Context생성
  const FeedbackDialog = ToggleProvider;
  // Dialog Context생성
  const AnotherDialog = ToggleProvider;
  return (
    <div className="flex flex-col">
      <ToggleProvider>
        <AnotherDialog>
          <ToggleProvider.Trigger>
            <button>동일한 프로바이더1 Trigger</button>
          </ToggleProvider.Trigger>
          <AnotherDialog.Trigger>
            <button>동일한 프로바이더2 Trigger</button>
          </AnotherDialog.Trigger>
          <AnotherDialog.Content>
            이거는 테스트 프로바이더
          </AnotherDialog.Content>

          <ToggleProvider.Content>
            <p>안녕</p>
          </ToggleProvider.Content>
        </AnotherDialog>
      </ToggleProvider>
    </div>
  );
};

export default CounterTest;
