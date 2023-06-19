'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';

import type { KeywordSchema } from '@/constants/schema/login';
import { LOGIN_KEYWORD_SCHEMA } from '@/constants/schema/login';

import Keywords from './Keywords';

function LoginKeyword({ keyword }: KeywordSchema) {
  const methods = useForm<KeywordSchema>({
    mode: 'onChange',
    resolver: zodResolver(LOGIN_KEYWORD_SCHEMA),
    defaultValues: {
      keyword: [],
    },
  });

  const control = methods.control;
  const keywords = useWatch({ name: 'keyword', control });

  const onSubmit = async () => {
    console.log('data submit');
  };

  return (
    <FormProvider {...methods}>
      <Keywords keyword={keyword} />

      <Button disabledBtn={keywords.length}>
        {keywords.length > 0 && keywords.length + '개'} 작성
      </Button>
    </FormProvider>
  );
}

export default LoginKeyword;

const Button = styled.button<{ disabledBtn: number }>`
  display: block;

  width: 100%;

  padding: 1rem;

  border-radius: 0.5rem;

  background-color: #fde7eb;
  color: #f7b4c0;

  ${({ style, disabledBtn }) =>
    disabledBtn &&
    css`
      background-color: #ff647d;
      color: white;
    `}
`;
