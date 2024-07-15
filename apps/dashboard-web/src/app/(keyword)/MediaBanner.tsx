'use client';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import { useGetRandomMedia } from '@/hooks/react-query/query/useGetRandomMedia';
import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useGetWeeklyKeyword from '@/hooks/react-query/query/useGetWeeklyKeyword';
import useGetWeeklyTrendKeyword from '@/hooks/react-query/query/useGetWeeklyTrendKeyword';
import useGetWeeklyVideo from '@/hooks/react-query/query/useGetWeeklyVideo';
import { useSelectedWord } from '@/store/selectedWordStore';
import { cn } from '@/utils/cn';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';
import type { MediaProps } from '@/utils/media/mediaFormat';

type MediaCategory = 'youtube' | 'news';

interface Props {
  randomOptios: MediaCategory[];
}

const MediaBanner = ({ randomOptios: test }: Props) => {
  const mediaCount = 3;

  const randomRef = useRef(
    Array.from({ length: 3 }, () => (Math.random() < 0.5 ? 'news' : 'youtube')),
  );

  const randomOptios = randomRef.current;

  const [sliceNumber, setSliceNumber] = useState(mediaCount);

  const [indexNumber, setIndexNumber] = useState(mediaCount);

  const { data } = useGetWeeklyTrendKeyword();

  const { data: weeklyVideo } = useGetWeeklyVideo();

  // const [keywordMap, setKeywordMap] = useState<
  //   Map<string, (typeof rankingRelatedWord)[number]>
  // >(new Map());

  // const topKeywordList = data
  //   ?.map((data) => data.recommendedKeyword)
  //   .slice(0, sliceNumber);

  // const {
  //   data: rankingRelatedWord,
  //   isError,
  //   isErrorList,
  // } = useGetRankingWordList(topKeywordList || [], {
  //   onError(err) {},
  // });

  // useEffect(() => {
  //   setSliceNumber(
  //     mediaCount + isErrorList.filter((isError) => isError === true).length,
  //   );
  // }, [isErrorList]);

  // const hasMedia = useRef(new Map());

  // // console.log(keywordMap.has('한국'));
  // // 정해진 인덱스읙 개념을 주입해서 넣어줘야함
  // const getFirstOccurrences = useCallback(
  //   (arr: typeof rankingRelatedWord): typeof rankingRelatedWord => {
  //     arr.forEach((item) => {
  //       if (!hasMedia.current.has(item.keyword)) {
  //         // console.log(keywordMap.has(item.keyword));
  //         // console.log(item);
  //         hasMedia.current.set(item.keyword, item);
  //       }
  //     });

  //     return Array.from(hasMedia.current.values());
  //   },
  //   [JSON.stringify(rankingRelatedWord)],
  // );

  // const result = getFirstOccurrences(rankingRelatedWord);

  const getCategoryOrder = (category: MediaCategory, index: number) => {
    if (category === 'youtube') {
      const youtubeIndex = randomOptios
        .slice(0, index + 1)
        .filter((cat) => cat === 'youtube').length;
      return youtubeIndex;
    } else {
      const newsIndex = randomOptios
        .slice(0, index + 1)
        .filter((cat) => cat === 'news').length;
      return newsIndex;
    }
  };

  // 해당 useQuery 라이프사이클에서 혼동이 왔음 (select문이 해당 fetch를 성공했을 경우 한번만 출력되길 바랬는데, 안되네)
  const firstMedia = useGetRandomMedia({
    searchKeyword: data ? data[0].recommendedKeyword : undefined,
    relatedkeyword: data ? data[0].topAssociatedWord.split(',')[0] : undefined,
    mediaCategory: randomOptios[0],
    page: getCategoryOrder(randomOptios[0], 0),
    index: 1,
    setIndexNumber,
  });
  /**
   * index 프로퍼티, (category가 다른데, queryKey 중복이 일어나는걸 방지 )
   */

  const secondMedia = useGetRandomMedia({
    searchKeyword: data ? data[1].recommendedKeyword : undefined,
    relatedkeyword: data ? data[1].topAssociatedWord.split(',')[0] : undefined,
    mediaCategory: randomOptios[1],
    page: getCategoryOrder(randomOptios[1], 1),
    index: 2,
    setIndexNumber,
  });

  const thirdMedia = useGetRandomMedia({
    searchKeyword: data ? data[2].recommendedKeyword : undefined,
    relatedkeyword: data ? data[2].topAssociatedWord.split(',')[0] : undefined,
    mediaCategory: randomOptios[2],
    page: getCategoryOrder(randomOptios[2], 2),
    index: 3,
    setIndexNumber,
  });

  const fourthMedia = useGetRandomMedia({
    searchKeyword:
      data && indexNumber > 3 ? data[3].recommendedKeyword : undefined,
    relatedkeyword:
      data && indexNumber > 3
        ? data[3].topAssociatedWord.split(',')[0]
        : undefined,
    mediaCategory: randomOptios[2],
    page: getCategoryOrder(randomOptios[2], 2),
    index: 4,
    setIndexNumber,
  });

  const fifth = useGetRandomMedia({
    searchKeyword:
      data && indexNumber > 4 ? data[4].recommendedKeyword : undefined,
    relatedkeyword:
      data && indexNumber > 4
        ? data[4].topAssociatedWord.split(',')[0]
        : undefined,
    mediaCategory: randomOptios[2],
    page: getCategoryOrder(randomOptios[2], 2),
    index: 5,
    setIndexNumber,
  });

  const results = [firstMedia, secondMedia, thirdMedia, fourthMedia, fifth]
    .filter(
      (
        media,
      ): media is {
        mediaResult: MediaProps;
        fetchTime: number;
        searchKeyword: string;
        relatedkeyword: string;
        mediaCategory: string;
      } => media.mediaResult !== undefined,
    )
    .slice(0, 3)
    .sort((a, b) => {
      // 먼저 mediaCategory를 내림차순으로 정렬
      // if (a.mediaCategory > b.mediaCategory) return -1;
      // if (a.mediaCategory < b.mediaCategory) return 1;
      // mediaCategory가 같으면 fetchTime을 오름차순으로 정렬
      return a.fetchTime - b.fetchTime;
    });

  // console.log(results);

  // console.log(firstMedia);
  // console.log(time);

  // console.log(randomOptios);
  // 해당 부분 코드에 대해서 의심이 있음. map으로써 custom hook을 실행하는 것인데, 이렇게 하면 useMemo useCallback은 hook rule 위배로 인하여 불가능한 구조이고 해당 컴포넌트가 리렌더링이 일어날 때마다 지속적인 생성이 되지않을까 걱정

  // 해당 부분 useGetRandomMedia가 렌더링마다 실행되어서 마지막 데이터가 load될 때 리렌더링 일어남  (그로인해 sort가 정확하지 않음)

  /**
   * 아래 코드는 반복문에서 hook을 사용해서 hookrule 위배
   * const hookResults = result.length
    ? result.map(({ keyword, relword }, index, array) => {
        if (randomOptios[index] === 'youtube') {
          const youtubeIndex = randomOptios
            .slice(0, index + 1)
            .filter((cat) => cat === 'youtube').length;

          return useGetRandomMedia({
            searchKeyword: keyword,
            relatedkeyword: relword,
            mediaCategory: randomOptios[index],
            page: youtubeIndex,
            index: index,
          });
        } else {
          const newsIndex = randomOptios
            .slice(0, index + 1)
            .filter((cat) => cat === 'news').length;

          return useGetRandomMedia({
            searchKeyword: keyword,
            relatedkeyword: relword,
            mediaCategory: randomOptios[index],
            page: newsIndex,
            index,
          });
        }
      })
    : [];

  console.log(hookResults);
   */

  // .filter(
  //   (media): media is { mediaResult: MediaProps; fetchTime: number } =>
  //     media.mediaResult !== undefined,
  // );
  // .sort((a, b) => a.fetchTime! - b.fetchTime!);

  // console.log(hookResults.length && hookResults[0].fetchTime);

  const emptyMediaLength = useMemo(
    () => 3 - results.length,
    [JSON.stringify(results)],
  );

  return (
    <div className="flex justify-between gap-[20px] ">
      {results?.map(
        (
          { mediaResult, searchKeyword, relatedkeyword, mediaCategory },
          index,
          array,
        ) =>
          mediaResult && (
            <SelectedMediaCard
              key={mediaResult.title + index}
              mediaType={mediaCategory}
              title={mediaResult.title}
              provider={mediaResult.provider}
              element={mediaResult.element}
              uploadDate={mediaResult.uploadDate}
              image={mediaResult.image}
              link={mediaResult.link}
            />
          ),
      )}

      {Array.from({ length: emptyMediaLength }).map((_, i) => (
        <SelectedMediaCard.skeleton key={i} />
      ))}
    </div>
  );
};

export default MediaBanner;

const Skeleton = () => {
  return (
    <div>
      <div className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden">
          <SvgComp
            icon="SideLogo"
            width={60}
            height={60}
            className="opacity-30"
          />
        </div>
        <div className="h-[100px]"></div>
      </div>
    </div>
    // <div
    //   className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid"
    //   key={i}
    // >
    //   <div
    //     className="bg-grey200 dark:bg-grey700 relative flex aspect-video animate-pulse  items-center justify-center overflow-hidden rounded-lg"
    //     role="status"
    //   >
    //     <svg
    //       className="text-grey400 dark:text-grey600 h-10 w-10"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="currentColor"
    //       viewBox="0 0 16 20"
    //     >
    //       <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
    //       <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
    //     </svg>
    //     <span className="sr-only">Loading...</span>
    //   </div>

    //   <div className="px-[16px] py-[12px]">
    //     <p className=" bg-grey200 mb-2 line-clamp-2 h-[16px] w-[278px] rounded-full "></p>
    //     <div className="flex gap-[8px]">
    //       <p className=" bg-grey200 h-[16px] w-[64px] rounded-full "></p>
    //       <p className=" bg-grey200  h-[16px] w-[32px] rounded-full "></p>
    //       <p className=" bg-grey200  h-[16px] w-[32px] rounded-full "></p>
    //     </div>
    //   </div>
    // </div>
  );
};
