import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react';
import SvgDonate from '@dothis/share/components/ui/Icons/SvgDonate';
import Tag from '@dothis/share/components/ui/Tag';
import StatusTag from '@dothis/share/components/ui/Tag/StatusTag';
import UserAvatar from '@dothis/share/components/ui/UserAvatar';
import { RequestPostDomain } from '@dothis/share/domain';
import { breakpoints, colors, fontWeights, typo } from '@dothis/share/lib/styles/chakraTheme';
import { youtubeUrlToId } from '@dothis/share/lib/utils';
import { css } from '@emotion/react';
import type { MutableRefObject } from 'react';
import React, { useMemo } from 'react';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react/swiper-react';
import type { Swiper as SwiperClass } from 'swiper/types';

import ViewRequestPost from '@/components/contents/ViewRequestPost';
import UserLink from '@/components/ui/Links/UserLink';

type Props = {
  postRequestList: PostRequestItemProps['requestPost'][];
  swiperRef?: MutableRefObject<SwiperClass | null>;
  onSlideChange?: SwiperProps['onSlideChange'];
};
const ResolveRequestListSwiper = ({
                                    postRequestList,
                                    swiperRef,
                                    onSlideChange,
                                  }: Props) => {
  return (
    <div css={swiperWrapperStyle}>
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={28}
        breakpoints={{
          [breakpoints.lgMobile]: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          [breakpoints.pc]: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
          },
        }}
        // loop={postRequestList.length > 3}
        // spaceBetween={40}
        threshold={5}
        onSlideChange={onSlideChange}
        onSwiper={(swiperIns) => {
          if (swiperRef) swiperRef.current = swiperIns;
        }}
        grabCursor
        loop
      >
        {postRequestList.map((requestPost) => (
          <SwiperSlide
            key={`${requestPost.id}`}
            className='list-item-swiper_slide'
          >
            <VerticalPostRequestItem requestPost={requestPost} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

type PostRequestItemProps = { requestPost: RequestPostDomain.GetItemT };

const makeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

function VerticalPostRequestItem({ requestPost }: PostRequestItemProps) {
  const youtubeId = useMemo(
    () =>
      requestPost.solvedUrl ? youtubeUrlToId(requestPost.solvedUrl) : null,
    [requestPost],
  );
  return (
    <div css={postRequestItemStyle}>
      <div className='request-post-swiper-item-contents'>
        <ViewRequestPost.ModalLink requestPost={requestPost}>
          <AspectRatio ratio={16 / 9} bg='bg.dark'>
            <Box className='item-img-wrap'>
              {youtubeId && (
                <img src={makeThumbnail(youtubeId)} alt='thumbnail image' />
              )}
            </Box>
          </AspectRatio>
          <Text as='strong' noOfLines={2}>
            {requestPost.title}
          </Text>
        </ViewRequestPost.ModalLink>
        <div className='item-bottom'>
          {requestPost.creator?.user && (
            <UserLink userId={requestPost.creator.userId}>
              <UserAvatar user={requestPost.creator.user} size={42} />
            </UserLink>
          )}
          <div className='item-info'>
            <Flex gap='8px' mb={2}>
              {requestPost.category && (
                <Tag theme='orange'>
                  {RequestPostDomain.constants.categoryKor.get(
                    requestPost.category,
                  )}
                </Tag>
              )}
              <StatusTag requestStatus={requestPost.status} />
            </Flex>
            <div className='etc-info'>
              {requestPost.creator?.user.name && (
                <span>@{requestPost.creator.user.name}</span>
              )}
              {/*<span>{numberUtils.thousandsSeparators(donationFee)}원</span>*/}
              <span>0 P</span>
              <Box className='item-donate'>
                <SvgDonate fill={colors.gray['70']} />
                <span>{requestPost.requestFundings.length}</span>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const postRequestItemStyle = css`
  .item-img-wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    flex: auto;
    overflow: hidden;
  }

  .item-img-wrap img {
    object-fit: cover;
    width: 100%;
    transition: transform 0.3s;
  }

  .request-post-swiper-item-contents {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &:hover {
    .item-img-wrap img {
      transform: scale(1.06);
    }
  }

  strong {
    min-height: 40px;
    margin-top: 10px;
    ${typo.t2};
  }

  .item-bottom {
    display: flex;
    margin-top: 10px;

    .item-info {
      margin-left: 18px;

      .etc-info {
        display: flex;
        align-items: center;
        margin-top: 8px;
        gap: 8px;

        ${typo.t4};
        font-weight: ${fontWeights.m};
      }
    }

    .item-donate {
      font-weight: ${fontWeights.m};
      display: flex;
      align-items: center;

      * + * {
        margin-left: 2px;
      }
    }
  }
`;

const swiperWrapperStyle = css`
  position: relative;
  width: 100%;

  .swiper,
  .swiper-wrapper {
    height: 100%;
  }
`;

export default ResolveRequestListSwiper;
