import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/common/Layout/Footer';
import TopBannerMediaList from '@/components/MainContents/MediaArticles/TopBannerMediaList';

import AdsBanner from './AdsBanner';
import App from './ErrorTest';
import MainSearchbar from './MainSearchbar';
import MediaBanner from './MediaBanner';
import WeeklyKeyword from './WeeklyKeyword';

const Page = () => {
  const mock_weeklyKeywordRank = [
    { label: '아이돌', lastWeek: 4 },
    { label: '먹방', lastWeek: 8 },
    { label: '애니메이션', lastWeek: 2 },
    { label: '영화', lastWeek: 3 },
    { label: '게임', lastWeek: 5 },
  ];

  const randomMediaCategoryList = Array.from({ length: 3 }, () =>
    Math.random() < 0.5 ? 'news' : 'youtube',
  );

  return (
    <>
      <div className="px-[66px]">
        <div className="mx-auto  flex  max-w-[1548px] flex-col">
          <h2 className="text-grey900 mb-[40px] mt-[80px] text-center text-[28px]">
            콘텐츠에서 가장 중요한 주제 선정,
            <br />
            <span className="text-primary500 font-bold">두디스</span>에서{' '}
            <span className="text-primary500 font-bold">검색</span>해보세요!
          </h2>
          <MainSearchbar />

          <div className=" mb-[57px]">
            <Link
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLSc4WwQb9SbmZMMhghQWQQ3Oh-q1slxewT4kpic3C-kf-YnXmw/viewform' as Route
              }
              target="_blank"
            >
              <AdsBanner />
            </Link>
          </div>
          <div className="mb-[52px] flex">
            <div className="expandSideBar:mr-[100px] mr-[50px] flex-grow">
              <p className="text-grey700 mb-[30px] text-[14px] font-bold">
                오늘의 이슈{' '}
              </p>
              <MediaBanner randomOptios={randomMediaCategoryList} />
            </div>

            <div className="ml-auto min-w-[300px] flex-grow px-[12px]">
              <p className="text-grey700 mb-[30px] text-[14px] font-bold">
                금주의 이슈 키워드
              </p>

              <WeeklyKeyword />
              {/* 
            <ul className="flex flex-col gap-[15px]">
              {mock_weeklyKeywordRank.map((item, i) => (
                <li key={i} className="gap-30 flex items-center p-[10px]">
                  <p className="text-grey500">{i + 1}</p>
                  <p className="flex-grow">{item.label}</p>
                  <div className="h-[20px] w-[20px]">
                    {i + 1 === item.lastWeek ? (
                      <div className="text-center">
                        <span className="">-</span>
                      </div>
                    ) : i + 1 < item.lastWeek ? (
                      <div className="flex items-center  justify-center">
                        <span className="text-[12px] text-[#F00]">
                          {item.lastWeek - (i + 1)}
                        </span>
                        <span className="h-0 w-0 border-x-[4px] border-b-[8px]  border-x-transparent border-b-[#F00]"></span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-[12px] text-[#3183FF]">
                          {' '}
                          {i + 1 - item.lastWeek}
                        </span>
                        <span className="h-0 w-0 border-x-[4px] border-t-[8px]  border-x-transparent border-t-[#3183FF]"></span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
