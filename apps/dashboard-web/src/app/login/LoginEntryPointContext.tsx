'use client';

import { createContext, useContext, useState } from 'react';

interface LoginEntryPointState {
  loginEntryPoint: string | null;
  setLoginEntryPoint: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginEntryPointContext = createContext<LoginEntryPointState | null>(null);

export const useLoginEntryPointContext = (componentName: string) => {
  const context = useContext(LoginEntryPointContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <LoginEntryPointContext>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const LoginEntryPointProvider = ({
  children,
}: {
  initialLoginEntryPoint: string;
  children: React.ReactNode;
}) => {
  const localStorageLoginEntryPoint = localStorage.getItem('loginEntryPoint');

  const [loginEntryPoint, setLoginEntryPoint] = useState(
    localStorageLoginEntryPoint,
  );

  return (
    <LoginEntryPointContext.Provider
      value={{
        loginEntryPoint,
        setLoginEntryPoint,
      }}
    >
      {children}
    </LoginEntryPointContext.Provider>
  );
};

export default LoginEntryPointProvider;
