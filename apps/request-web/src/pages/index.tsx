import { Box } from '@chakra-ui/react';
import {
  colors,
  Container,
  mediaQueries,
  SwiperButton,
  ToastBox,
  typo,
} from '@dothis/share';
import OnlyPcContainer from '@dothis/share/components/layout/OnlyPcContainer';
import {
  flushMessageSession,
  withSessionSSR,
} from '@dothis/share/lib/utils/sessionUtils';
import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import type { GetServerSidePropsContext } from 'next/types';
import { useSession } from 'next-auth/react';
import type { ComponentProps } from 'react';
import React, { useRef } from 'react';
import type { Swiper as SwiperClass } from 'swiper/types';

import MainSwiper from '@/components/article/MainSwiper';
import RecommendRequests from '@/components/article/RecommendRequests';
import ResolveRequestListSwiper from '@/components/article/ResolveRequestListSwiper';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import useMessageToast from '@/hooks/useMessageToast';
import { youtubeSignIn } from '@/utils/auth';
import { trpc, trpcSSG } from '@/utils/trpc';

const Banners: ComponentProps<typeof MainSwiper>['Banners'] = [
  () => {
    const { data } = useSession();
    const trpcUtils = trpc.useContext();

    return (
      <a
        href="#"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
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

          youtubeSignIn();
        }}
      >
        <Image
          priority={true}
          sizes="cover"
          fill
          src="/images/banner2.svg"
          alt="크리에이터 등록"
        />
      </a>
    );
  },
];

export const getServerSideProps = withSessionSSR(
  async (context: GetServerSidePropsContext) => {
    const trpcSSGHelpers = await trpcSSG();
    const messageProps = await flushMessageSession(context.req);

    await Promise.all([
      trpcSSGHelpers.requestPost.getSolveds.prefetch(),
      trpcSSGHelpers.requestPost.getRecommends.prefetch(),
    ]);

    return {
      props: {
        trpcState: trpcSSGHelpers.dehydrate(),
        ...messageProps,
      },
    };
  },
);

export default function Home({
  session_message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const resolvedRequestSwiperRef = useRef<SwiperClass | null>(null);
  const solvedRequests = trpc.requestPost.getSolveds.useQuery();
  const recommendRequests = trpc.requestPost.getRecommends.useQuery();

  useMessageToast(session_message);

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
        <RecommendRequests
          recommendRequests={
            recommendRequests.data ? recommendRequests.data : []
          }
        />
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
