import type { BoxProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import type { MouseEventHandler, ReactNode } from 'react';

import Button from '../../../components/ui/Button';

export type SubmitTemplateProps = {
  children: ReactNode;
  submitText?: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  cancelText?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
} & BoxProps;
const SubmitModalTemplate = ({
  children,
  submitText = '확인',
  onSubmit,
  cancelText = '취소',
  onCancel,
  ...props
}: SubmitTemplateProps) => {
  return (
    <Box px={{ base: 16, tablet: 24 }} py={{ base: 32, tablet: 24 }} {...props}>
      <Box>{children}</Box>
      <Flex mt={24} gap={16}>
        <Button theme="primary" onClick={onSubmit} h={40} flex="auto">
          {submitText}
        </Button>
        <Button theme="white" onClick={onCancel} h={40} flex="auto">
          {cancelText}
        </Button>
      </Flex>
    </Box>
  );
};

export default SubmitModalTemplate;
