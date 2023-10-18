'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import type { KeywordSchema } from '@/constants/schema/login';
import { LOGIN_KEYWORD_SCHEMA } from '@/constants/schema/login';
import { apiClient } from '@/utils/apiClient';
import { isHashKeyword } from '@/utils/isHashKeyword';

import Keywords from './Keywords';
import * as Style from './style';

const LoginKeyword = () => {
  const methods = useForm<KeywordSchema>({
    mode: 'onChange',
    resolver: zodResolver(LOGIN_KEYWORD_SCHEMA),
    defaultValues: {
      keyword: [],
    },
  });

  const router = useRouter();

  const { data: keywordArr, isLoading: keywordLoading } = apiClient(
    2,
  ).user.getUserKeyword.useQuery(['keyword']);

  const { mutate } = apiClient(1).user.putUpdatePersonalTag.useMutation();

  const channel_keywords = keywordArr?.body.data[0].channel_keywords;
  const channel_tags = keywordArr?.body.data[0].channel_tags;

  const combinedKeywordsAndTags = (
    arr1: string[] | undefined | null,
    arr2: string[] | undefined | null,
  ) => {
    if (!arr1) arr1 = [];
    if (!arr2) arr2 = [];

    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
      throw new Error('타입 에러발생 ');
    }

    return arr1.concat(arr2);
  };

  // 해당  keyword api 와 combinedKeywordsAndTags 은 middleware에서 라우팅가드로 재사용가능성이 있음.

  useEffect(() => {
    if (
      combinedKeywordsAndTags(channel_keywords, channel_tags).length === 0 ||
      isHashKeyword(combinedKeywordsAndTags(channel_keywords, channel_tags))
    ) {
      // router.replace('/contents');
      console.log('contents로');
      return;
    }
  }, [keywordArr]);

  const control = methods.control;
  const keywords = useWatch({ name: 'keyword', control });

  const onSubmit = async ({ keyword }: { keyword: string[] }) => {
    mutate({ body: { tag: keyword } });

    router.push('/');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Keywords
          keyword={combinedKeywordsAndTags(channel_keywords, channel_tags)}
        />

        <div className="flex justify-center font-bold">
          <Button
            theme="contained"
            size="L"
            paddingX="!px-[70px]"
            disabled={keywords.length === 0}
          >
            선택완료
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginKeyword;
