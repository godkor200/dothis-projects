import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface SearchParamNavProps {
  navKeys: string[];
  searchKey: string;
}

// Note: 기존 search param 이 계속 사라짐
const SearchParamNav = ({ navKeys, searchKey }: SearchParamNavProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const pathname = usePathname();

  return (
    <div className="border-grey400 flex flex-row gap-[20px] border-b-2 px-5 pb-2 text-[18px]">
      {navKeys.map((navKey, index) => {
        const newSearchParams = index ? `${searchKey}=${index}` : '';
        params.delete(searchKey);
        const existingSearchParams = decodeURIComponent(params.toString());
        return (
          <Link
            href={{
              pathname: pathname,
              search: existingSearchParams
                ? `${newSearchParams}?${existingSearchParams}`
                : newSearchParams,
            }}
            scroll={false}
            replace={true}
            className={clsx(
              'translate-y-[9.5px] cursor-pointer transition duration-500 ease-in-out',
              index === Number(searchParams?.get(searchKey))
                ? 'border-primary500 border-b-2 font-bold text-black'
                : 'text-grey400',
            )}
            key={index}
          >
            {navKey}
          </Link>
        );
      })}
    </div>
  );
};

export default SearchParamNav;
