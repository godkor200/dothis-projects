import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SvgComp from '@/components/common/SvgComp';

import SummaryTab from './summary/page';
import { tabList } from './tabList';
import TabNav from './TabNav';

const Page = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const keyword = decodeURIComponent(params.keyword);
  const relatedWord = decodeURIComponent(params.related_word);

  return (
    <>
      <SummaryTab
        params={{
          keyword: keyword,
          related_word: relatedWord,
        }}
      />
    </>
  );
};

export default Page;
