import { cn } from '@/utils/cn';

interface MediaArticlesTabNavProps {}

const TabNavData = [
  { title: '유튜브', category: 'youtube' },
  { title: '커뮤니티', category: 'community' },
  { title: 'SNS', category: 'SNS' },
  { title: '뉴스', category: 'news' },
] as const;

const MediaArticlesTabNav = () => {
  return (
    <header className="border-grey400 bg-grey00 flex gap-[0.75rem] border-b border-solid pb-[30px]">
      {TabNavData.map((item, index) => (
        <>
          <h2 className={'cursor-pointer text-[32px] font-bold'}>
            {item.title}
          </h2>
          {index !== TabNavData.length - 1 && (
            <h2 className="text-grey400 text-[32px] font-bold">/</h2>
          )}
        </>
      ))}
    </header>
  );
};

export default MediaArticlesTabNav;
