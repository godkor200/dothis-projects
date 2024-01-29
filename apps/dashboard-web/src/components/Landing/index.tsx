'use client';

import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';
import { Layout } from './style';
import Temp_page from './temp_page';
import Toolbar from './toolbar';

export default function Landing() {
  return (
    <Layout>
      <Toolbar />
      <Temp_page />
      {/* <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 /> */}
    </Layout>
  );
}
