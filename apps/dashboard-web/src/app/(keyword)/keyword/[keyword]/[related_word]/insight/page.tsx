import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SvgComp from '@/components/common/SvgComp';

const Page = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const keyword = decodeURIComponent(params.keyword);
  const relatedWord = decodeURIComponent(params.related_word);

  return <></>;
};

export default Page;
