import { useMemo } from 'react';

import SvgComp from '@/components/common/SvgComp';
import {
  useAddKeywordMutation,
  useRemoveKeywordMutation,
} from '@/hooks/react-query/mutation/useKeywordMutation';
import {
  useAddSearchwordMutation,
  useDeleteSearchwordMutation,
  useRemoveSearchwordMutation,
} from '@/hooks/react-query/mutation/useSearchwordMutation';
import { convertKeywordsToArray } from '@/utils/keyword';

import * as Style from './style';

/**
 * props로 keyword List를 받으며, 활성화된 keyword를 앞으로 정렬하는 포맷팅을 하는 컴포넌트
 */
interface Props {
  userKeywordList: string | undefined | null;
  searchWordList: string | undefined | null;
}

const MyKeywordList = ({ userKeywordList, searchWordList }: Props) => {
  const searchWordArray = convertKeywordsToArray(searchWordList);
  const userKeywordArray = convertKeywordsToArray(userKeywordList);

  const [withHashSearchWord, withoutHashSearchWord] = useMemo(
    () => splitByHashtag(searchWordArray),
    [searchWordList],
  );

  const [withHashKeyword, withoutHashKeyword] = useMemo(
    () => splitByHashtag(userKeywordArray),
    [userKeywordList],
  );

  // 여기서 더 최적화를 한다면 api 요청을 최소하는 것 이전과 같은결과로 update를 해야할 때도 제어하지않고 그 배열을 그대로 api 요청을 보냄 (이거를 조건을 걸어줘서 줄여줄 수 있다)
  // 한마디로 mutate결과가 변화가 없으면 안시키는 방향으로
  const { mutate: addKeywordMutate } = useAddKeywordMutation();

  const { mutate: removeKeywordMutate } = useRemoveKeywordMutation();

  const { mutate: addSearchwordMutate } = useAddSearchwordMutation();

  const { mutate: removeSearchwordMutate } = useRemoveSearchwordMutation();

  const { mutate: deleteSearchwordMutate } = useDeleteSearchwordMutation();

  return (
    <>
      {withHashKeyword.map((item) => (
        <Style.Button
          key={item}
          $active={true}
          onClick={() => removeKeywordMutate(item)}
        >
          {item.replace('#', '')}
        </Style.Button>
      ))}
      {withHashSearchWord.map((item) => (
        <Style.Button
          key={item}
          $active={true}
          onClick={() => removeSearchwordMutate(item)}
        >
          {item.replace('#', '')}
          <SvgComp
            icon="KeywordDelete"
            size="1rem"
            onClick={(event) => {
              event.stopPropagation();
              deleteSearchwordMutate(item);
            }}
          />
          {/* 여기서 X버튼으로 delete시 modal을 하나 생성하고 지우는게 좋을 듯 싶다. */}
        </Style.Button>
      ))}
      {withoutHashKeyword.map((item) => (
        <Style.Button
          key={item}
          $active={false}
          onClick={() => addKeywordMutate(item)}
        >
          {item}
        </Style.Button>
      ))}
      {withoutHashSearchWord.map((item) => (
        <Style.Button
          key={item}
          $active={false}
          onClick={() => addSearchwordMutate(item)}
        >
          {item}
          {item && (
            <SvgComp
              icon="KeywordDelete"
              size="1rem"
              onClick={(event) => {
                event.stopPropagation();
                deleteSearchwordMutate(item);
              }}
            />
          )}
        </Style.Button>
      ))}
    </>
  );
};

export default MyKeywordList;

// onClick mutate할 때 하나하나 filter로 검사할 빠에는 분리를 시키자.

function splitByHashtag(arr: string[]) {
  let withHashtag = [];
  let withoutHashtag = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('#')) {
      withHashtag.push(arr[i]);
    } else {
      withoutHashtag.push(arr[i]);
    }
  }

  return [withHashtag, withoutHashtag];
}
