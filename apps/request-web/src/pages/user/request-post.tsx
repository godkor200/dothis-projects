import { Box, Center, HStack, Spinner, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

import HorizonPostRequestItem from '@/components/article/HorizonPostRequestItem';
import HorizonPostRequestItemWrap from '@/components/layout/HorizonPostRequestItemWrap';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import { pagePath } from '@/constants';
import { trpc } from '@/utils/trpc';
import { withUserSessionSSR } from '@/utils/session';
import { Container } from '@/components/layout/Container';
import { SvgSearch } from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { typo } from '@/styles/dothisTheme';

const querySchema = z.object({
  searchText: z.string().optional(),
});

export const getServerSideProps = withUserSessionSSR(
  async (context, userSession) => {
    const { searchText } = querySchema.parse(context.query);

    // const userRequest = await trpcServerClient.query(
    //   'user - infinite search user request',
    //   {
    //     userId: userSession.id,
    //     cursor: undefined,
    //     searchText,
    //   },
    // );

    return {
      props: {
        userId: userSession.id,
        searchText,
        // userRequest,
      },
    };
  },
  pagePath.home().pathname,
);

const requestPost = ({
  searchText: _searchText,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchText, _setSearchText] = useState(_searchText);
  const router = useRouter();
  const debouncedSearchText = useDebouncedCallback(
    (_searchText: typeof searchText) => {
      _setSearchText(_searchText === '' ? undefined : inputRef.current?.value);
      userSearchRequestPost.remove();
    },
    500,
  );

  const userSearchRequestPost = trpc.user.getSearchRequests.useInfiniteQuery(
    {
      userId,
      searchText,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      onSuccess: (data) => {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              searchText,
            },
          },
          undefined,
          { shallow: true },
        );
      },
    },
  );

  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView) {
      userSearchRequestPost.fetchNextPage();
    }
  }, [inView]);

  return (
    <LayoutTemplate>
      <Container css={style}>
        <Text as="h2" my={40}>
          요청 관리
        </Text>
        <Box>
          <HStack>
            <Input
              key="input"
              Right={
                <Center h="100%" w={32} pr={8}>
                  <SvgSearch />
                </Center>
              }
              theme="white"
              size="sm"
              placeholder="검색"
              onChange={(e) => {
                debouncedSearchText(e.target.value);
              }}
              defaultValue={searchText}
              wrapProps={{ maxW: 210 }}
              ref={inputRef}
            />
          </HStack>
        </Box>
        <Box my={42}>
          {userSearchRequestPost.data?.pages?.[0] &&
          userSearchRequestPost.data.pages[0].items.length > 0 ? (
            <HorizonPostRequestItemWrap>
              <>
                {userSearchRequestPost.data?.pages.map(({ items }) =>
                  items.map((request) => (
                    <HorizonPostRequestItem
                      key={`${request.id}`}
                      matchText={searchText}
                      requestPost={request}
                    />
                  )),
                )}
                <div ref={ref}></div>
              </>
            </HorizonPostRequestItemWrap>
          ) : (
            <Center p={32}>
              {userSearchRequestPost.isLoading ? (
                <Spinner w={32} h={32} />
              ) : (
                '조건에 해당하는 요청이 없습니다.'
              )}
            </Center>
          )}
        </Box>
      </Container>
    </LayoutTemplate>
  );
};

const style = css`
  h2 {
    ${typo.h1};
  }
`;
export default requestPost;
