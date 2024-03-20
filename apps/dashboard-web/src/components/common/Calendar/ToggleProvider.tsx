import { createContext, useContext, useState } from 'react';

interface ToggleState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleContext = createContext<ToggleState | null>(null);

export const useToggleContext = (componentName: string) => {
  const context = useContext(ToggleContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <ToggleProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const ToggleProvider = ({
  children,
  initialOpen = false,
}: {
  children: React.ReactNode;
  initialOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  return (
    <ToggleContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;

const ToggleTrigger = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useToggleContext('ToggleTrigger');

  return <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>;
};

const ToggleContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useToggleContext('ToggleContent');

  return <> {isOpen && children}</>;
};

const ToggleClose = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useToggleContext('ToggleClose');

  return <div onClick={() => setIsOpen(false)}>{children}</div>;
};

ToggleProvider.Trigger = ToggleTrigger;

ToggleProvider.Content = ToggleContent;

ToggleProvider.Close = ToggleClose;
