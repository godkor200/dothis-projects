import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';

import { extractQueryParams } from '../utils';


type ParseSchema<K extends ZodRawShape> = ZodObject<K>;
const useParsedQuery = <K extends ZodRawShape>(parseSchema: ParseSchema<K>) => {
  const router = useRouter();
  return useMemo(() => {
    const obj = extractQueryParams(router.asPath);
    return parseSchema.parse(obj);
  }, [router.asPath]);
};
export default useParsedQuery;
