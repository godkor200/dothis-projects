import { cn } from '@/utils/cn';

interface RelatedContentCardHeaderProps {
  relatedContent: string;
}

const RelatedContentCategory = ['youtube', 'community', 'SNS', 'news'] as const;

type RelatedContentCategoryType = (typeof RelatedContentCategory)[number];

const convertToRelatedContent: { [key in RelatedContentCategoryType]: string } =
  {
    youtube: '유튜브',
    community: '커뮤니티',
    SNS: 'SNS',
    news: '뉴스',
  };

const RelatedContentCardHeader = ({
  relatedContent,
}: RelatedContentCardHeaderProps) => {
  return (
    <header className="border-grey300 bg-grey00 flex gap-[0.75rem] border-b border-solid pb-[30px]">
      {RelatedContentCategory.map((item, index) => {
        return (
          <>
            <h1
              className={cn('text-[32px] font-bold', {
                'text-grey500': relatedContent !== item,
              })}
            >
              {convertToRelatedContent[item]}
            </h1>
            {index !== RelatedContentCategory.length - 1 && (
              <h1 className="text-grey400 text-[32px] font-bold">/</h1>
            )}
          </>
        );
      })}
    </header>
  );
};

export default RelatedContentCardHeader;
