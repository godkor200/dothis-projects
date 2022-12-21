import { Box, Flex } from '@chakra-ui/react';
import type { MouseEventHandler, ReactNode } from 'react';

import { Button } from '../../ui/Button';

export type ConfirmTemplateProps = {
  children: ReactNode;
  confirmText?: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
};
export const ConfirmModalTemplate = ({
  children,
  confirmText = '확인',
  onConfirm,
}: ConfirmTemplateProps) => {
  return (
    <Box px={{ base: 16, tablet: 24 }} py={24}>
      <Box >{children}</Box>
      <Flex mt={24} gap={16}>
        <Button theme="white" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Flex>
    </Box>
  );
};