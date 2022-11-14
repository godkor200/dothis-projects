import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Container from '@dothis/share/components/layout/Container';
import HorizonPostRequestItemWrap from '@dothis/share/components/layout/HorizonPostRequestItemWrap';
import Button from '@dothis/share/components/ui/Button';
import SvgShareForward from '@dothis/share/components/ui/Icons/SvgShareForward';
import SelectMenu from '@dothis/share/components/ui/SelectMenu/SelectMenu';
import SelectMenuButton from '@dothis/share/components/ui/SelectMenu/SelectMenuButton';
import SelectMenuList from '@dothis/share/components/ui/SelectMenu/SelectMenuList';
import UserAvatar from '@dothis/share/components/ui/UserAvatar';
import useParsedQuery from '@dothis/share/lib/hooks/useParsedQuery';
import {
  colors,
  fontSizes,
  fontWeights,
  mediaQueries,
} from '@dothis/share/lib/styles/chakraTheme';
import { shareUrlObject } from '@dothis/share/lib/utils/appUtils';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext } from 'next/types';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { z } from 'zod';

import HorizonPostRequestItem from '@/components/article/HorizonPostRequestItem';
import NewRequestPost from '@/components/contents/NewRequestPost';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import { pagePath } from '@/constants';
import type { inferQueryOutput } from '@/utils/trpc';
import { trpc, trpcSSG } from '@/utils/trpc';

import { CreatorDomain, RequestPostDomain } from '../../domain';

export const querySchema = z
  .object({
    userId: z.string(),
  })
  .merge(RequestPostDomain.filterSchema);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { userId } = querySchema.parse(context.query);
    const trpcSSGHelper = await trpcSSG();

    const user = await trpcSSGHelper.user.get.fetch({
      id: userId,
    });

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: pagePath.home().pathname,
        },
      };
    }

    return {
      props: {
        creatorUserId: userId,
        creatorUser: user,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: pagePath.home().pathname,
      },
    };
  }
}

type Props = {
  creatorUserId: string;
  creatorUser: NonNullable<inferQueryOutput['user']['get']>;
};
const CreatorPage = ({ creatorUserId, creatorUser }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const query = useParsedQuery(querySchema);

  const categoryFilter = useMemo(
    () => query.categoryFilter ?? 'ALL',
    [query.categoryFilter],
  );
  const requestFilter = useMemo(
    () => query.requestFilter ?? 'ALL',
    [query.requestFilter],
  );
  const order = useMemo(() => query.order ?? 'LATEST', [query.order]);

  const creatorRequests = trpc.creator.getRequests.useInfiniteQuery(query, {
    getNextPageParam(lastPage) {
      return lastPage.nextCursor;
    },
  });
  const myRequests = trpc.requestPost.getUserForCreator.useQuery(
    { userId: session?.user.id, creatorUserId },
    {
      enabled: !!session?.user.id && !!creatorUserId,
    },
  );

  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView) {
      creatorRequests.fetchNextPage();
    }
  }, [inView]);

  return (
    <LayoutTemplate>
      <Container css={style} mt={40} mb={68}>
        <Box className="creator-profile" position="relative">
          <UserAvatar
            size={80}
            user={creatorUser}
            Text={
              <Text
                as="h3"
                fontSize="h1"
                fontWeight="b"
                ml={20}
                maxW={{ base: 'auto', tablet: 360 }}
                noOfLines={2}
              >
                {creatorUser.name}
              </Text>
            }
          />
          <Box
            position={{
              base: 'relative',
              tablet: 'absolute',
            }}
            top={0}
            right={0}
            my={{ base: 20, tablet: 0 }}
          >
            {creatorUser.creator?.creatorAuths && (
              <HStack spacing={16}>
                {creatorUser.creator.creatorAuths.map((auth) => {
                  const { Component } =
                    CreatorDomain.constants.platformDetail[auth.platform];

                  return (
                    <Button
                      key={auth.platform}
                      disabled={!auth.profileUrl}
                      theme="white"
                      size="sm"
                      w={32}
                      h={32}
                      round
                    >
                      {auth.profileUrl ? (
                        <Link href={auth.profileUrl} target="_blank">
                          <Component key={auth.platform} />
                        </Link>
                      ) : (
                        <Component key={auth.platform} />
                      )}
                    </Button>
                  );
                })}
                <Button
                  theme="primary"
                  h={36}
                  w={96}
                  onClick={() =>
                    shareUrlObject({
                      title: `${creatorUser.name}님의 프로필`,
                      urlObject: pagePath.user({
                        userId: creatorUser.id,
                      }),
                    })
                  }
                >
                  <SvgShareForward fill="white" />
                  <Text as="span" ml={4}>
                    요청 주소
                  </Text>
                </Button>
              </HStack>
            )}
          </Box>

          <Box color="gray.80" mt={32}>
            {creatorUser.introduction}
          </Box>
        </Box>
        {creatorUser.creator && (
          <>
            <Divider
              mt={{
                base: 24,
                tablet: 56,
              }}
              mb={30}
            />
            <Text as="h3" mb={20} fontSize="t1" fontWeight="m">
              {NewRequestPost.title()}
            </Text>
            <NewRequestPost
              creatorId={creatorUser.creator.id}
              onSubmit={() => {
                router.replace(router.asPath);
              }}
            />
          </>
        )}
        {myRequests?.data && myRequests?.data.length > 0 && (
          <>
            <Divider mt={8} mb={30} />
            <Box as="section">
              <Flex
                as="header"
                alignItems="center"
                justifyContent="space-between"
                h={48}
                mb={20}
              >
                <Text as="h2" fontSize="h3" fontWeight="b">
                  내 요청
                </Text>
                <Link
                  className="view-more-request"
                  href={pagePath.userRequestPost({
                    searchText: creatorUser.name ? creatorUser.name : undefined,
                  })}
                >
                  더보기
                </Link>
              </Flex>
              <HorizonPostRequestItemWrap>
                {myRequests.data.map((request) => (
                  <HorizonPostRequestItem
                    key={`${request.id}`}
                    requestPost={request}
                  />
                ))}
              </HorizonPostRequestItemWrap>
            </Box>
          </>
        )}

        {creatorUser.creator && (
          <>
            <Divider my={30} />
            <Box as="section">
              <Flex
                as="header"
                alignItems={{ base: 'start', tablet: 'center' }}
                flexDirection={{ base: 'column', tablet: 'row' }}
                justifyContent="space-between"
                mb={20}
              >
                <Text as="h2" fontSize="h3" fontWeight="b">
                  받은 요청
                </Text>
                <HStack spacing={30} marginTop={{ base: 12, tablet: 0 }}>
                  <SelectMenu theme="transparent" width={120}>
                    <SelectMenuButton>
                      {RequestPostDomain.constants.categoryFilter.get(
                        categoryFilter,
                      )}
                    </SelectMenuButton>
                    <SelectMenuList
                      listMap={RequestPostDomain.constants.categoryFilter}
                      selectedItemValue={categoryFilter}
                      onItemSelect={(v) => {
                        router.replace(
                          router.pathname,
                          {
                            query: { ...query, categoryFilter: v },
                          },
                          { shallow: true },
                        );
                      }}
                    />
                  </SelectMenu>
                  <SelectMenu theme="transparent" width={113}>
                    <SelectMenuButton>
                      {RequestPostDomain.constants.requestFilter.get(
                        requestFilter,
                      )}
                    </SelectMenuButton>
                    <SelectMenuList
                      listMap={RequestPostDomain.constants.requestFilter}
                      selectedItemValue={requestFilter}
                      onItemSelect={(v) => {
                        router.replace(
                          router.pathname,
                          {
                            query: { ...query, requestFilter: v },
                          },
                          { shallow: true },
                        );
                      }}
                    />
                  </SelectMenu>
                  {/* 정렬 */}
                  {/*<SelectMenu*/}
                  {/*  list={RequestPostDomain.constants.order.entries()}*/}
                  {/*  selectedItemValue={*/}
                  {/*    (query.order as string | undefined) ?? 'LATEST'*/}
                  {/*  }*/}
                  {/*  theme="transparent"*/}
                  {/*  width={97}*/}
                  {/*  onItemSelect={(v) => {*/}
                  {/*    router.replace(*/}
                  {/*      router.pathname,*/}
                  {/*      {*/}
                  {/*        query: { ...query, order: v },*/}
                  {/*      },*/}
                  {/*      { shallow: true },*/}
                  {/*    );*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <SelectMenuButton />*/}
                  {/*  <SelectMenuList />*/}
                  {/*</SelectMenu>*/}
                </HStack>
              </Flex>
              {creatorRequests.data?.pages?.[0]?.items &&
              creatorRequests.data.pages[0].items.length > 0 ? (
                <HorizonPostRequestItemWrap>
                  <>
                    {creatorRequests.data?.pages.map(({ items }) =>
                      items
                        ? items.map(
                            (request) =>
                              request && (
                                <HorizonPostRequestItem
                                  key={`${request.id}`}
                                  requestPost={request}
                                />
                              ),
                          )
                        : null,
                    )}
                    <div ref={ref}></div>
                  </>
                </HorizonPostRequestItemWrap>
              ) : (
                <Center p={32}>
                  {creatorRequests.isLoading ? (
                    <Spinner w={32} h={32} />
                  ) : (
                    '조건에 해당하는 요청이 없습니다.'
                  )}
                </Center>
              )}
            </Box>
          </>
        )}
      </Container>
    </LayoutTemplate>
  );
};
const style = css`
  .request-received {
    flex-direction: column;

    ${mediaQueries.tablet} {
      flex-direction: row;
    }
  }

  .view-more-request {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 24px;
    color: ${colors.primary.default};
    font-weight: ${fontWeights.b};
    font-size: ${fontSizes.t4};
  }
`;

export default CreatorPage;
