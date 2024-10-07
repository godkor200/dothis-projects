import type { Route } from 'next';

import RouteTabNav from '../../../components/common/Tab/RouteTabNav';
import { accountTabList } from '../keyword/[keyword]/[related_word]/tabList';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-10 max-w-[1700px] px-[66px]">
      <RouteTabNav
        tabList={accountTabList}
        baseRoute={`/account` as Route}
        tabKey="accountTab"
      />

      <div className="mx-auto  mt-[20px] w-[1000px]">{children}</div>
    </div>
  );
};

export default Layout;
