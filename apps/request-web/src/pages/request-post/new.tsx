import React from 'react';

import NewRequestPost from '@/components/contents/NewRequestPost';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import { Container } from '@dothis/share';

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
