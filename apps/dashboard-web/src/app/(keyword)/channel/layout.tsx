import type { Route } from 'next';

import { channelTabList } from '../keyword/[keyword]/[related_word]/tabList';
import TabNav from '../keyword/[keyword]/[related_word]/TabNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-10 max-w-[1700px] px-[66px]">
      <TabNav tabList={channelTabList} baseRoute={`/channel` as Route} />

      {children}
    </div>
  );
};

export default Layout;
