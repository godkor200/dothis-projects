import { Flex } from '@chakra-ui/react';
import Button from '@dothis/share/components/ui/Button';
import globalStyle from '@dothis/share/lib/styles/globalStyle';
import { Global } from '@emotion/react';
import { clsx } from 'clsx';
import {} from 'next/';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={clsx()}>
      <head />

      <Global styles={globalStyle} />

      <Flex>{children}</Flex>
    </html>
  );
}
