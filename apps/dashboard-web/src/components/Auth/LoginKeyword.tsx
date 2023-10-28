'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import type { KeywordSchema } from '@/constants/schema/login';
import { LOGIN_KEYWORD_SCHEMA } from '@/constants/schema/login';
import { apiClient } from '@/utils/apiClient';
import {
  combinedKeywordsAndTags,
  convertKeywordsToArray,
  isHashKeyword,
} from '@/utils/keyword';

import Keywords from './Keywords';

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

  const { data: userData } = apiClient(1).auth.getOwnInfo.useQuery(['user']);

  const queryClient = useQueryClient();

  const { mutate } = apiClient(1).user.putUpdatePersonalTag.useMutation({
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
      router.push('/');
    },
  });

  const channel_keywords = keywordArr?.body?.data?.channel_keywords;
  const channel_tags = keywordArr?.body?.data?.channel_tags;

  // 해당  keyword api 와 combinedKeywordsAndTags 은 middleware에서 라우팅가드로 재사용가능성이 있음.

  useEffect(() => {
    if (
      combinedKeywordsAndTags(channel_keywords, channel_tags).length === 0 ||
      isHashKeyword(
        convertKeywordsToArray(userData?.body.data.personalizationTag),
      )
    ) {
      router.replace('/contents');
      return;
    }
  }, [keywordArr, userData]);

  const control = methods.control;
  const keywords = useWatch({ name: 'keyword', control });

  const onSubmit = async ({ keyword }: { keyword: string[] }) => {
    const hashkeywords = keyword.map((item) => item + '#');
    const restkeywords = combinedKeywordsAndTags(
      channel_keywords,
      channel_tags,
    ).filter((item) => !keyword.includes(item));

    mutate({ body: { tag: [...hashkeywords, ...restkeywords] } });
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
            type="submit"
          >
            선택완료
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginKeyword;
