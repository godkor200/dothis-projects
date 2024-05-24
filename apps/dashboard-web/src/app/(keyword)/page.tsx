import Image from 'next/image';

import TopBannerMediaList from '@/components/MainContents/MediaArticles/TopBannerMediaList';

import AdsBanner from './AdsBanner';
import MainSearchbar from './MainSearchbar';
import MediaBanner from './MediaBanner';

const Page = () => {
  return (
    <div>
      <h2 className="text-grey900 mb-[40px] mt-[80px] text-center text-[28px]">
        콘텐츠에서 가장 중요한 주제 선정,
        <br />
        <span className="text-primary500 font-bold">두디스</span>에서
        <span className="text-primary500 font-bold">검색</span>해보세요!
      </h2>

      <MainSearchbar />

      <div className="mb-[57px]">
        <AdsBanner />
      </div>
      <div className="mb-[52px]">
        <p className="text-grey700 mb-[30px] text-[14px] font-bold">
          오늘의 이슈{' '}
        </p>
        <MediaBanner />
      </div>
    </div>
  );
};

export default Page;
