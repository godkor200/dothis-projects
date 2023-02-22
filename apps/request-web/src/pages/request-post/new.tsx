import React from 'react';

import NewRequestPost from '@/components/contents/NewRequestPost';
import { Container } from '@/components/layout/Container';
import LayoutTemplate from '@/components/layout/LayoutTemplate';

const RequestNew = () => {
  return (
    <LayoutTemplate>
      <Container>
        <NewRequestPost />
      </Container>
    </LayoutTemplate>
  );
};

export default RequestNew;
