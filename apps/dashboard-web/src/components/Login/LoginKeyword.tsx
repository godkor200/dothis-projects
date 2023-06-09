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

      <Button>{keywords.length > 0 && keywords.length + '개'} 작성 </Button>
    </FormProvider>
  );
}

export default LoginKeyword;

const Button = styled.button`
  width: 15rem;
  height: 2rem;
  margin: 0;
  border: 0;
  outline: 0;

  font-size: 0.875rem;
  background-color: transparent;
  border: 0.125rem solid red;
  border-radius: 5rem;

  ${({ style }) => css`
    &::placeholder {
      color: black;
    }
  `}

  @media (min-width: 768px) {
    height: 2.25rem;
    font-size: 1rem;
  }
`;
