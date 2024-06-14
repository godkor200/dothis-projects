'use client';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useGetRandomMedia } from '@/hooks/react-query/query/useGetRandomMedia';
import useGetWeeklyKeyword from '@/hooks/react-query/query/useGetWeeklyKeyword';
import { useSelectedWord } from '@/store/selectedWordStore';
import { cn } from '@/utils/cn';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';
import type { MediaProps } from '@/utils/media/mediaFormat';

type MediaCategory = 'youtube' | 'news';

interface Props {
  randomOptios: MediaCategory[];
}

const useTest = () => {
  const [state, setState] = useState(1);

  return state;
};

const MediaBanner = ({ randomOptios }: Props) => {
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
    mediaCategory: randomOptios[0],
    page: getCategoryOrder(randomOptios[0], 0),
    index: 1,
  });
  /**
   * index 프로퍼티, (category가 다른데, queryKey 중복이 일어나는걸 방지 )
   */

  const secondMedia = useGetRandomMedia({
    mediaCategory: randomOptios[1],
    page: getCategoryOrder(randomOptios[1], 1),
    index: 2,
  });

  const thirdMedia = useGetRandomMedia({
    mediaCategory: randomOptios[2],
    page: getCategoryOrder(randomOptios[2], 2),
    index: 3,
  });

  const results = [firstMedia, secondMedia, thirdMedia]
    .filter(
      (media): media is { mediaResult: MediaProps; fetchTime: number } =>
        media.mediaResult !== undefined,
    )
    .sort((a, b) => a.fetchTime! - b.fetchTime!);

  // console.log(results);

  // console.log(firstMedia);
  // console.log(time);

  // console.log(randomOptios);
  // 해당 부분 코드에 대해서 의심이 있음. map으로써 custom hook을 실행하는 것인데, 이렇게 하면 useMemo useCallback은 hook rule 위배로 인하여 불가능한 구조이고 해당 컴포넌트가 리렌더링이 일어날 때마다 지속적인 생성이 되지않을까 걱정

  // 해당 부분 useGetRandomMedia가 렌더링마다 실행되어서 마지막 데이터가 load될 때 리렌더링 일어남  (그로인해 sort가 정확하지 않음)
  const hookResults = randomOptios.map((category, index, array) => {
    if (category === 'youtube') {
      const youtubeIndex = array
        .slice(0, index + 1)
        .filter((cat) => cat === 'youtube').length;

      return useGetRandomMedia({
        mediaCategory: category,
        page: youtubeIndex,
        index: index,
      });
    } else {
      const newsIndex = array
        .slice(0, index + 1)
        .filter((cat) => cat === 'news').length;

      return useGetRandomMedia({
        mediaCategory: category,
        page: newsIndex,
        index,
      });
    }
  });
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
        ({ mediaResult }, index) =>
          mediaResult && (
            <SelectedMediaCard
              key={mediaResult.title + index}
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
