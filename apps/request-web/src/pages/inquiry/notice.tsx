import type { InferGetServerSidePropsType } from 'next';
import React from 'react';

import Container from '@/components/layout/Container';
import InquiryLayoutHeader from '@/components/layout/InquiryLayoutHeader';
import LayoutTemplate from '@/components/layout/LayoutTemplate';

export function getServerSideProps() {
  return {
    props: {
      // props for your component
    },
  };
}
export default function NoticePage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <LayoutTemplate>
      <InquiryLayoutHeader />
    </LayoutTemplate>
  );
}
