import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { matchMarkList } from '../utils';
import { useBoolean } from './useBoolean';

type List = string[];
export type UseMatchParam = {
  getList: (value: string) => PromiseLike<List> | List;
  defaultValue?: string;
  onlyMatchOpen?: boolean;
  debounceDelay?: number;
};

export type UseMatchReturn = ReturnType<typeof useMatch>;

export function useMatch({
  getList,
  defaultValue,
  onlyMatchOpen,
  debounceDelay = 250,
}: UseMatchParam) {
  const [value, _setValue] = useState(defaultValue ?? '');
  const [matchList, setMatchList] = useState<ReturnType<typeof matchMarkList>>(
    [],
  );
  const pureValue = useMemo(() => value.replaceAll('@', ''), [value]);

  const debounceFn = useDebouncedCallback(async (v) => {
    if (v.length === 0) return setMatchList([]);

    const list = await getList(v);
    const markedList = matchMarkList(list, v);

    setMatchList(markedList);
  }, debounceDelay);
  const setValue = (v: typeof value) => {
    _setValue(v);
    debounceFn(v);
  };

  const [isHidden, setIsHidden] = useBoolean(false);
  const isOpen =
    !isHidden && (onlyMatchOpen ? matchList.length > 0 : value.length > 0);

  return {
    isOpen,
    matchList,
    isHidden,
    setIsHidden,
    value,
    setValue,
    pureValue,
  };
}
