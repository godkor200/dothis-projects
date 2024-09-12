'use client';

import { motion } from 'framer-motion';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { channelTabList } from '../keyword/[keyword]/[related_word]/tabList';

let tabs = [
  { id: 'world', label: 'World' },
  { id: 'ny', label: 'N.Y.' },
  { id: 'business', label: 'Business' },
  { id: 'arts', label: 'Arts' },
  { id: 'science', label: 'Science' },
];

function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  const router = useRouter();

  const pathName = usePathname();
  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);

            router.replace((pathName + `?mini=${tab.id}`) as Route);
          }}
          className={`${
            activeTab === tab.id ? '' : 'hover:text-white/60'
          } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="bg-primary600 absolute inset-0 z-10 mix-blend-difference"
              style={{ borderRadius: 9999 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-10 max-w-[1700px] px-[66px]">
      {/* <TabNav tabList={channelTabList} baseRoute={`/channel` as Route} /> */}
      {/* <AnimatedTabs /> */}
      {children}
    </div>
  );
};

export default Layout;
