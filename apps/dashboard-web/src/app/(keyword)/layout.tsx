'use client';

import { useState } from 'react';

import Side from './Side';
import Top from './Top';

const Layout = ({
  children,
  login,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <>{login}</>
      <div className="relative">
        <Top
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* GNB infinity border */}
        <div className="flex">
          <Side isSidebarOpen={isSidebarOpen} />
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
