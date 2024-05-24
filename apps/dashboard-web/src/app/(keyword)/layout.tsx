'use client';

import { useState } from 'react';

import Side from './Side';
import Top from './Top';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative ">
      <Top isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {/* GNB infinity border */}
      <div className="flex">
        <Side isSidebarOpen={isSidebarOpen} />
        <div className="flex-1 px-[66px]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
