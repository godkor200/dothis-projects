import type { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * queryString을 유지하면서 라우팅을 옮기는 함수
 * 더 다양한 케이스의 함수를 생성도 생각했지만,  이외의 케이스들은 만드는 것은 한번 논의가 필요할 것 같다.
 */
const useQueryString = () => {
  const searchParams = useSearchParams();

  /**
   * 중복되는  key의 queryString은 기존에 있단 key value를 최근의 바꾼 key value로 업데이트하는 형식이다. (따로 기존 key value를 제거하는 작업 필요X)
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  /**
   *
   * @returns  Route(string)형식으로 반환하고 있습니다. (Link href 프로퍼티의 UrlObject 형식도 고려하였지만, useRouter 오직 Route(string)형식만을 받고 있어서 Route(string)형식으로 지정)
   */
  const createUrlWithQueryString = ({
    route,
    name,
    value,
  }: {
    route?: Route;
    name: string;
    value: string;
  }): Route => {
    const queryString = createQueryString(name, value);
    /**
     * router가 존재하지 않을 때 pathName을 사용하려했지만, 타입에 예외처리를 진행해야해서 빈문자열('')로 대체
     */
    return `${route ? route : ''}?${queryString}`;
  };

  return { createUrlWithQueryString };
};

export default useQueryString;
