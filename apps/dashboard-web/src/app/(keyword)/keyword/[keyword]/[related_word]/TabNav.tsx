'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

import { tabList } from './tabList';

const TabNav = ({
  keyword,
  relatedWord,
}: {
  keyword: string;
  relatedWord: string;
}) => {
  const pathName = usePathname();

  return (
    <div className="border-grey400 flex  gap-[50px] border-b-4">
      {tabList.map((item) => (
        <Link
          href={`/keyword/${keyword}/${relatedWord}/${item.link}`}
          key={item.link}
        >
          <div
            className={cn(
              'mb-[-4px] w-[100px] border-b-4 border-grey400 pb-2 text-center font-bold',
              {
                'border-primary500': item.link === pathName?.split('/')[4],
              },
            )}
          >
            {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TabNav;
