import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import LayoutTemplate from '@/components/layout/LayoutTemplate';

const RequestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutTemplate>
      <Box as="header" className="sub"></Box>
      {children}
    </LayoutTemplate>
  );
};
export default RequestLayout;
