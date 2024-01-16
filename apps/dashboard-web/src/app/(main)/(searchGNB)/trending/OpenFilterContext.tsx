import { createContext, useContext, useState } from 'react';

interface OpenFilterState {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenFilterContext = createContext<OpenFilterState | null>(null);

export const useOpenFilterContext = (componentName: string) => {
  const context = useContext(OpenFilterContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <OpenFilterContextProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const OpenFilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <OpenFilterContext.Provider
      value={{
        openFilter,
        setOpenFilter,
      }}
    >
      {children}
    </OpenFilterContext.Provider>
  );
};

export default OpenFilterContextProvider;
