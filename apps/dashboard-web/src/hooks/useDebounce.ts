import { useCallback, useEffect } from 'react';

/**
 *
 * @param func callback 함수를 넣어줍니다.
 * @param delay setTimeout delay에 들어가는 수치이며, useDebounce쪽에서 기본값을 이미 넣어주고 있어서 기본값 설정은 하지않았습니다.
 * @returns debounce내에서 생성한 delayedCallback을 반환합니다.
 */
const debounce = <Params extends any[]>(
  func: (...args: Params) => any,
  delay: number,
) => {
  // setTimeout을 담아둘 변수를 생성했습니다.
  let timeout: ReturnType<typeof setTimeout>;

  const delayedCallback = (...args: Params) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, delay);
  };

  // 클린업 쪽에서 사용하기위해 cancel 메서드를 생성하였습니다.
  delayedCallback.cancel = function () {
    clearTimeout(timeout);
  };

  return delayedCallback;
};

/**
 *
 * @param callback 실행할 callback 함수를 넣어줍니다.
 * @param delay  stTimeout delay에 들어갈 수치입니다, 기본값은 1000입니다.
 * @param deps useEffect 및 useCallback 디펜던시에 들어갈 오브젝트를 받습니다.
 * @returns debouncedCallback 함수를 반환해서 매개변수를 포함하여 호출할 수 있습니다.
 */
const useDebounce = <Params extends any[]>(
  callback: (...args: Params) => any,
  delay = 1000,
  deps: any = [],
) => {
  const debouncedCallback = useCallback(debounce(callback, delay), [
    delay,
    ...deps,
  ]);

  // 언마운트 시 작동할 클린업 쪽에 clearTimeout을 넣어줍니다
  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [delay, ...deps]);

  return debouncedCallback;
};

export default useDebounce;
