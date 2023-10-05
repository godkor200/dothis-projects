'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import type { KeywordSchema } from '@/constants/schema/login';
import { LOGIN_KEYWORD_SCHEMA } from '@/constants/schema/login';

import Keywords from './Keywords';
import * as Style from './style';

const LoginKeyword = ({ keyword }: KeywordSchema) => {
  const methods = useForm<KeywordSchema>({
    mode: 'onChange',
    resolver: zodResolver(LOGIN_KEYWORD_SCHEMA),
    defaultValues: {
      keyword: [],
    },
  });

  const control = methods.control;
  const keywords = useWatch({ name: 'keyword', control });

  const router = useRouter();

  const onSubmit = async () => {
    console.log('data submit');
    router.push('/');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Keywords keyword={keyword} />

        <Style.LoginKeywordButton $disabledBtn={keywords.length}>
          {keywords.length > 0 && keywords.length + '개'} 작성
        </Style.LoginKeywordButton>
      </form>
    </FormProvider>
  );
};

export default LoginKeyword;
