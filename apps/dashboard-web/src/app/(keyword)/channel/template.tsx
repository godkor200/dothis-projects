'use client';
import { motion } from 'framer-motion';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import ParamsTabNav from '@/components/common/Tab/ParamsTabNav';

import TabNav from '../../../components/common/Tab/RouteTabNav';
import {
  channelTabList,
  tabList,
} from '../keyword/[keyword]/[related_word]/tabList';
import TabList from './tabList';

let tabs = [
  { id: 'summary', label: 'World' },
  { id: 'channel-analysis', label: 'N.Y.' },
  { id: 'competitive-analysis', label: 'Business' },
  { id: 'video-assessment', label: 'Arts' },
];

function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  const router = useRouter();

  const pathName = usePathname();

  const [, , tabname] = pathName?.split('/') ?? [];
  console.log(tabname);
  return (
    <div className="gap-30 relative flex space-x-1">
      <div className="bg-grey600 absolute bottom-0  h-1 w-full " />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);

            router.push(('/channel/' + tab.id) as Route);
          }}
          className={`${
            tabname === tab.id ? '' : 'hover:text-white/60'
          } relative rounded-full py-1.5 text-center  text-sm font-medium text-black outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {tabname === tab.id && (
            <motion.span
              layoutId="underline"
              className="bg-primary600 absolute bottom-0 z-10 h-1 w-full opacity-100 mix-blend-lighten "
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

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="bg-primary500 h-20 w-full"></div>
      <ParamsTabNav
        tabList={tabList}
        baseRoute={`/channel` as Route}
        tabKey="channel_views"
        paramsKey="view"
      />
      {/* <AnimatedTabs /> */}

      <ParamsTabNav
        tabList={tabList}
        baseRoute={`/channel` as Route}
        tabKey="channel_views"
        paramsKey="view"
      />
      <TabList />
      <TabNav
        tabList={channelTabList}
        baseRoute={`/channel` as Route}
        tabKey="channelTab"
      />
      {children}
    </div>
  );
};

export default Template;
