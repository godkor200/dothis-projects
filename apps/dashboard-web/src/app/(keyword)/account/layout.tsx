import type { Route } from 'next';

import { accountTabList } from '../keyword/[keyword]/[related_word]/tabList';
import TabNav from '../keyword/[keyword]/[related_word]/TabNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-10 max-w-[1700px] px-[66px]">
      <TabNav tabList={accountTabList} baseRoute={`/account` as Route} />

      <div className="mx-auto  mt-[20px] w-[1000px]">{children}</div>
    </div>
  );
};

export default Layout;
