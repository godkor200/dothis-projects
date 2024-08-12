import React from 'react';

import LoginEntryPointProvider from './LoginEntryPointContext';

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoginEntryPointProvider initialLoginEntryPoint="">
      {children}
    </LoginEntryPointProvider>
  );
};

export default Template;
