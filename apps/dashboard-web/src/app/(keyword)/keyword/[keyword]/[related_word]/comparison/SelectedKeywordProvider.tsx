'use client';

import { createContext, useContext, useState } from 'react';

interface SelectedKeywordState {
  relatedKeywordList: string[];
  setRelatedKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedKeywordContext = createContext<SelectedKeywordState | null>(null);

export const useSelectedKeywordContext = (componentName: string) => {
  const context = useContext(SelectedKeywordContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <SelectedKeywordProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const SelectedKeywordProvider = ({
  relatedKeyword,
  children,
}: {
  relatedKeyword: string;
  children: React.ReactNode;
}) => {
  const [relatedKeywordList, setRelatedKeywordList] = useState<string[]>([
    relatedKeyword,
  ]);

  // setRelatedKeywordList 함수를 확장하여 공통 로직을 추가
  const updateRelatedKeywordList: React.Dispatch<
    React.SetStateAction<string[]>
  > = (action) => {
    setRelatedKeywordList((prevList) => {
      let newKeywords;

      if (typeof action === 'function') {
        // action이 함수인 경우
        newKeywords = action(prevList);
      } else {
        // action이 배열인 경우
        newKeywords = action;
      }

      // 공통 로직 추가 (중복 제거)
      if (!newKeywords.includes(relatedKeyword)) {
        newKeywords = [relatedKeyword, ...newKeywords];
      }

      return newKeywords;
    });
  };

  return (
    <SelectedKeywordContext.Provider
      value={{
        relatedKeywordList,
        setRelatedKeywordList: updateRelatedKeywordList,
      }}
    >
      {children}
    </SelectedKeywordContext.Provider>
  );
};

export default SelectedKeywordProvider;
