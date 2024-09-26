import { usePathname } from 'next/navigation';

const usePathNameList = () => {
  const pathName = usePathname();

  const pathNameList = pathName?.split('/').filter(Boolean) ?? [];

  return pathNameList;
};

export default usePathNameList;
