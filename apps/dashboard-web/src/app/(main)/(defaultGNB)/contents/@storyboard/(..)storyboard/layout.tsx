'use client';

import React, { useState } from 'react';

import ResizeHandle from '@/components/StoryBoard/ResizeHandle/ResizeHandle';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarWidth, setSidebarWidth] = useState(948);

  return (
    <div className="sticky top-0 z-20 flex w-full">
      <ResizeHandle
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        className="absolute z-20"
        style={{ right: `${sidebarWidth}px` }}
      />
      <div
        className="absolute right-0 top-0  flex h-screen  w-[948px] bg-white shadow-[rgba(0,0,1,0.1)_-6px_0_5px_-1px]"
        style={{
          width: `${sidebarWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
