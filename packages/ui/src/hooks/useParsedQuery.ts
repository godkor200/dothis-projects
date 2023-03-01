import { extractQueryParams } from '@dothis/share/lib/utils';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';

type ParseSchema<K extends ZodRawShape> = ZodObject<K>;
export const useParsedQuery = <K extends ZodRawShape>(
  parseSchema: ParseSchema<K>,
) => {
  const router = useRouter();
  return useMemo(() => {
    const obj = extractQueryParams(router.asPath);
    return parseSchema.parse(obj);
  }, [router.asPath]);
};
