'use client';

import Page1_abtest from '@/components/Landing/page1/index_abtest';
import Page2 from '@/components/Landing/page2';
import Page3_abtest from '@/components/Landing/page3/index_abtest';
import Page4_abtest from '@/components/Landing/page4/index_abtest';
import Page5 from '@/components/Landing/page5';
import Page6 from '@/components/Landing/page6';
import { Layout } from '@/components/Landing/style';
import Toolbar from '@/components/Landing/toolbar';

const Landing_test = () => {
  return (
    <Layout>
      <Toolbar />
      <Page1_abtest />
      <Page2 />
      <Page3_abtest />
      <Page4_abtest />
      <Page5 />
      <Page6 />
    </Layout>
  );
};

export default Landing_test;
