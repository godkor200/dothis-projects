import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import SvgComp from '@/components/common/SvgComp';
import { apiClient } from '@/utils/api/apiClient';
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
  const queryClient = useQueryClient();

  const { mutate } = apiClient(1).user.putUpdatePersonalTag.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
    },
  });

  const { mutate: mutateSearchWord } = apiClient(
    1,
  ).user.putSearchWord.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  const handleAddKeyword = (item: string) => {
    // mutate가 변화가 없다면 안하는 방향으로 가야할듯
    mutate({
      body: {
        tag: addHashAndConvertToArray(userKeywordList, item),
      },
    });
  };

  const handleRemoveKeyword = (item: string) => {
    mutate({
      body: {
        tag: removeHashAndConvertToArray(userKeywordList, item),
      },
    });
  };

  const handleAddSearchWord = (item: string) => {
    mutateSearchWord({
      body: {
        searchWord: addHashAndConvertToArray(searchWordList, item),
      },
    });
  };

  const handleRemoveSearchWord = (item: string) => {
    mutateSearchWord({
      body: {
        searchWord: removeHashAndConvertToArray(searchWordList, item),
      },
    });
  };

  const handleDeleteSearchWord = (item: string) => {
    mutateSearchWord({
      body: {
        searchWord: deleteKeywordAndConvertToArray(searchWordList, item),
      },
    });
  };

  const isHashedTag = useMemo(() => {
    return searchWordArray
      .concat(userKeywordArray)
      .filter((item) => item.endsWith('#')).length === 1
      ? false
      : true;
  }, [searchWordArray, userKeywordArray]);

  console.log(isHashedTag);

  const removeHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }
      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      if (!isHashedTag) {
        return dataArray;
      }

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 제거합니다.
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          dataArray[i] = dataArray[i].replace('#', '');
        }
      }

      return dataArray;
    },
    [isHashedTag],
  );

  const addHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }
      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 추가합니다.
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          dataArray[i] += '#';
        }
      }

      return dataArray;
    },
    [],
  );

  const deleteKeywordAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }

      const dataArray = userKeyword.split(',');

      if (!isHashedTag && keyword.endsWith('#')) {
        return dataArray;
      }

      // 키워드와 일치하며, #이 붙어있지 않은 요소만 남김

      const resultArray = dataArray.filter((item) => {
        return !(
          item === keyword ||
          (item === keyword + '#' && item.endsWith('#'))
        );
      });

      return resultArray;
    },
    [isHashedTag],
  );

  return (
    <>
      {withHashKeyword.map((item) => (
        <Style.Button
          key={item}
          $active={true}
          onClick={() => handleRemoveKeyword(item)}
        >
          {item.replace('#', '')}
        </Style.Button>
      ))}
      {withHashSearchWord.map((item) => (
        <Style.Button
          key={item}
          $active={true}
          onClick={() => handleRemoveSearchWord(item)}
        >
          {item.replace('#', '')}
          <SvgComp
            icon="KeywordDelete"
            size="1rem"
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteSearchWord(item);
            }}
          />
          {/* 여기서 X버튼으로 delete시 modal을 하나 생성하고 지우는게 좋을 듯 싶다. */}
        </Style.Button>
      ))}
      {withoutHashKeyword.map((item) => (
        <Style.Button
          key={item}
          $active={false}
          onClick={() => handleAddKeyword(item)}
        >
          {item}
        </Style.Button>
      ))}
      {withoutHashSearchWord.map((item) => (
        <Style.Button
          key={item}
          $active={false}
          onClick={() => handleAddSearchWord(item)}
        >
          {item}
          {item && (
            <SvgComp
              icon="KeywordDelete"
              size="1rem"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteSearchWord(item);
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
