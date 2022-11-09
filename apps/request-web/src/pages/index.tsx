import { Box } from '@chakra-ui/react';
import Container from '@dothis/share/components/layout/Container';
import HorizonPostRequestItemWrap from '@dothis/share/components/layout/HorizonPostRequestItemWrap';
import OnlyPcContainer from '@dothis/share/components/layout/OnlyPcContainer';
import SwiperButton from '@dothis/share/components/ui/Button/SwiperButton';
import ToastBox from '@dothis/share/components/ui/ToastBox';
import {
  colors,
  mediaQueries,
  typo,
} from '@dothis/share/lib/styles/chakraTheme';
import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import type { GetServerSidePropsContext } from 'next/types';
import { signIn, useSession } from 'next-auth/react';
import type { ComponentProps } from 'react';
import React, { useRef } from 'react';
import type { Swiper as SwiperClass } from 'swiper/types';

import HorizonPostRequestItem from '@/components/article/HorizonPostRequestItem';
import MainSwiper from '@/components/article/MainSwiper';
import ResolveRequestListSwiper from '@/components/article/ResolveRequestListSwiper';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import { trpc, trpcSSG } from '@/utils/trpc';

const Banners: ComponentProps<typeof MainSwiper>['Banners'] = [
  () => {
    const { data } = useSession();
    const trpcUtils = trpc.useContext();

    return (
      <a
        href="#"
        onClick={async (e) => {
          e.preventDefault();
          if (!data?.user) {
            ToastBox.errorToast(
              '크리에이터 등록을 하려면 로그인이 필요합니다.',
            );
            return;
          }
          const my = await trpcUtils.user.get.fetch({
            id: data?.user.id,
          });
          if (!my) return;
          if (my.creator) {
            ToastBox.errorToast('이미 크리에이터로 등록되어 있습니다.');
            return;
          }

          signIn('youtube', {
            callbackUrl: '/api/auth/creator',
          });
        }}
      >
        <img src="/images/banner2.svg" alt="크리에이터 등록" />
      </a>
    );
  },
];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const trpcSSGHelpers = await trpcSSG();

  await Promise.all([
    trpcSSGHelpers.requestPost.getSolveds.prefetch(),
    trpcSSGHelpers.requestPost.getRecommends.prefetch(),
  ]);

  return {
    props: {
      trpcState: trpcSSGHelpers.dehydrate(),
    },
  };
}

export default function Home({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const resolvedRequestSwiperRef = useRef<SwiperClass | null>(null);
  const solvedRequests = trpc.requestPost.getSolveds.useQuery();
  const recommendRequests = trpc.requestPost.getRecommends.useQuery();

  return (
    <LayoutTemplate>
      <OnlyPcContainer>
        {/* 메인 스와이퍼 */}
        <Box mt={{ base: 16, tablet: 32 }}>
          <MainSwiper Banners={Banners} />
        </Box>
      </OnlyPcContainer>
      <Container css={contentsStyle}>
        {/* 해결된 요청 */}

        {solvedRequests.data && (
          <section className="resolved-request-post">
            <div className="section-title">
              <h2>해결된 요청</h2>
              {/*<Link href="/src/pages" >*/}
              {/*  <a className="view-all-contents">*/}
              {/*    /!*<span>전체보기</span>*!/*/}
              {/*  </a>*/}
              {/*</Link>*/}

              <div className="section-slide-buttons">
                <SwiperButton
                  dir="prev"
                  onClick={() => resolvedRequestSwiperRef.current?.slidePrev()}
                />
                <SwiperButton
                  dir="next"
                  onClick={() => resolvedRequestSwiperRef.current?.slideNext()}
                />
              </div>
            </div>
            <div className="section-contents">
              <ResolveRequestListSwiper
                postRequestList={solvedRequests.data}
                swiperRef={resolvedRequestSwiperRef}
              />
            </div>
          </section>
        )}

        {/* 추천 요청 */}
        {recommendRequests.data && (
          <section className="recommend-request-post">
            <div className="section-title">
              <h2>🎯 추천 요청</h2>
            </div>
            <div className="section-contents">
              <HorizonPostRequestItemWrap>
                {recommendRequests.data.map((request) => (
                  <HorizonPostRequestItem
                    key={`${request.id}`}
                    requestPost={request}
                  />
                ))}
              </HorizonPostRequestItemWrap>
            </div>
          </section>
        )}
      </Container>
    </LayoutTemplate>
  );
}
const contentsStyle = css`
  section {
    padding-bottom: 28px;

    ${mediaQueries.tablet} {
      padding-bottom: 36px;
    }
  }

  section:first-of-type {
    padding-top: 24px;

    ${mediaQueries.tablet} {
      padding-bottom: 32px;
    }
  }

  section + section {
    padding-top: 36px;
    border-top: 2px solid ${colors.border['4']};
  }

  .section-title {
    display: flex;
    align-items: center;
    height: 48px;
  }

  .view-all-contents {
    display: flex;
    align-items: center;
    margin-left: 20px;
    color: ${colors.gray['60']};
    height: 100%;
    ${typo.t2};
  }

  h2 {
    ${typo.h2};
  }

  .section-slide-buttons {
    display: flex;
    height: 100%;
    margin-left: auto;

    * + * {
      margin-left: 12px;
    }
  }

  .section-contents {
    padding-top: 16px;

    ${mediaQueries.tablet} {
      padding-bottom: 24px;
    }
  }
`;
