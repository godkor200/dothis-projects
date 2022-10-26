import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';

import stringUtils from '@/utils/stringUtils';

type ParseSchema<K extends ZodRawShape> = ZodObject<K>;
const useParsedQuery = <K extends ZodRawShape>(parseSchema: ParseSchema<K>) => {
  const router = useRouter();
  return useMemo(() => {
    const obj = stringUtils.extractQueryParams(router.asPath);
    return parseSchema.parse(obj);
  }, [router.asPath]);
};
export default useParsedQuery;
