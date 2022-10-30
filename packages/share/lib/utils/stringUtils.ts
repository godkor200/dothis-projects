
import { isNil } from './common';

function isNilStr(str: unknown) {
  return isNil(str) || str === '';
}

function isNotEmptyStr(str: unknown): str is string {
  return typeof str === 'string' && str !== '';
}

function cutOverflowStr(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '...';
}

function toDashedPhone(phone: string) {
  if (phone.length === 11)
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  if (phone.length === 10)
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return undefined;
}

export const additionSearchParams =
  <SearchParams extends Record<string, string>>(path: string) =>
  (searchParams: SearchParams) =>
    [...Object.entries(searchParams)].reduce(
      (pv, cv, i) => `${pv}${i === 0 ? '?' : '&'}${cv.join('=')}`,
      path,
    );

// string url -> 쿼리 추출
export const extractQueryParams = (asPath: string) => {
  const queryString = asPath.split('?')[1];

  if (!queryString) return;

  const urlSearchParams = new URLSearchParams(queryString);
  
  // @ts-ignore
  return Object.fromEntries(urlSearchParams);
};

export const joinQueryParams = (query: Record<string, unknown>) =>
  Object.entries(query)
    .map((arr) => arr.join('='))
    .join('&');

const stringUtils = {
  extractQueryParams,
  isNilStr,
  isNotEmptyStr,
  toDashedPhone,
  cutOverflowStr,
  additionSearchParams,
  joinQueryParams,
};

export default stringUtils;
