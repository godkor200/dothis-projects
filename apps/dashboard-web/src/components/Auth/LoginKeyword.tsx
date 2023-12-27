'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { GUEST_KEYWORD } from '@/constants/guest';
import type { KeywordSchema } from '@/constants/schema/login';
import { LOGIN_KEYWORD_SCHEMA } from '@/constants/schema/login';
import { useInitialKeywordMutations } from '@/hooks/react-query/mutation/useKeywordMutation';
import useGetKeyword from '@/hooks/react-query/query/useGetKeyword';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
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

  const { data: keywordData } = useGetKeyword();

  const { data: userData } = useGetUserInfo();

  const { mutate } = useInitialKeywordMutations();

  const channel_keywords = keywordData?.channel_keywords;
  const channel_tags = keywordData?.channel_tags;

  const isGuest = !combinedKeywordsAndTags(channel_keywords, channel_tags)
    .length;

  // 해당  keyword api 와 combinedKeywordsAndTags 은 middleware에서 라우팅가드로 재사용가능성이 있음.

  useEffect(() => {
    if (isHashKeyword(convertKeywordsToArray(userData?.personalizationTag))) {
      // router.replace('/contents');
      // 기획단에서 키워드 재설정 여부가 가능하게 설계한다는 얘기를 들어서 임시로 주석처리
      return;
    }
  }, [keywordData, userData]);

  const control = methods.control;
  const keywords = useWatch({ name: 'keyword', control });

  const onSubmit = async ({ keyword }: { keyword: string[] }) => {
    function withOutHash(arr: string[], hashKeyword: string[]) {
      return arr.filter((item) => !hashKeyword.includes(item));
    }

    const hashkeywords = keyword.map((item) => item + '#');
    const restkeywords = isGuest
      ? withOutHash(GUEST_KEYWORD, keyword)
      : withOutHash(
          combinedKeywordsAndTags(channel_keywords, channel_tags),
          keyword,
        );

    mutate(
      { body: { tag: [...hashkeywords, ...restkeywords] } },
      {
        onSuccess: () => {
          router.push('/contents');
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Keywords
          keyword={
            isGuest
              ? GUEST_KEYWORD
              : combinedKeywordsAndTags(channel_keywords, channel_tags)
          }
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
