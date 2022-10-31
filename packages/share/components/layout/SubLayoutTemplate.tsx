import { Box, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  subTitle: ReactNode;
};

type SubNavigation = [[]];
const SubLayoutTemplate = ({ children, subTitle }: Props) => {
  return (
    <Box>
      <header>{subTitle}</header>
      <Flex>
        <HStack as="nav" spacing={4}>
          <Link href="@/components/layout/SubLayoutTemplate" passHref>
            <a></a>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};
export default SubLayoutTemplate;
