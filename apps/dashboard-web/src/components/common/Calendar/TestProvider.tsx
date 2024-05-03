import type { ReactElement } from 'react';
import React, { createContext, useContext, useState } from 'react';
import ReactDom from 'react-dom';

interface TestState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestContext = createContext<TestState | null>(null);

export const useTestContext = (componentName: string) => {
  const context = useContext(TestContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <ToggleProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const TestProvider = ({
  children,
  initialOpen = false,
}: {
  children: React.ReactNode;
  initialOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  return (
    <TestContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export default TestProvider;

const TestTrigger = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useTestContext('ToggleTrigger');

  if (!children) return null; // children이 없는 경우 null을 반환하여 렌더링하지 않음

  return React.cloneElement(children as ReactElement, {
    onClick: () => setIsOpen((prev) => !prev),
  });
};

const TestContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useTestContext('ToggleContent');

  return <> {isOpen && children}</>;
};

const TestPortal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useTestContext('ToggleContent');

  return (
    isOpen &&
    ReactDom.createPortal(
      <div
        onClick={() => setIsOpen(false)}
        className="absolute h-screen w-screen"
      >
        {children}
      </div>,
      globalThis.document?.body,
    )
  );
};

const TestClose = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useTestContext('ToggleClose');

  if (!children) return null; // children이 없는 경우 null을 반환하여 렌더링하지 않음

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    // 기존 onClick 핸들러 실행
    if (
      React.isValidElement(children) &&
      typeof children.props.onClick === 'function'
    ) {
      children.props.onClick(event);
    }
    // 새로운 onClick 핸들러 실행
    setIsOpen((prev) => !prev);
  };

  // children이 React 엘리먼트인 경우에만 onClick 이벤트를 추가하고, 그렇지 않은 경우에는 아무 작업도 하지 않음
  if (!React.isValidElement(children)) return null;

  return React.cloneElement(children as ReactElement, {
    onClick: handleOnClick,
  });
};

TestProvider.Trigger = TestTrigger;

TestProvider.Content = TestContent;

TestProvider.Close = TestClose;

TestProvider.Portal = TestPortal;
