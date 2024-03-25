import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

export type TrendingQuery = {
  categoryList: { value: number; label: string }[];
  keywordList: string[];
  startDate: Dayjs;
};
type UpdateFunction<T> = (updateFunc: (prevValue: T) => T) => void;

interface TrendingQueryState {
  trendingQuery: TrendingQuery;
  trendingQueryActions: {
    setTrendingQuery: React.Dispatch<React.SetStateAction<TrendingQuery>>;
    setCategoryList: UpdateFunction<TrendingQuery['categoryList']>;
    setKeywordList: UpdateFunction<TrendingQuery['keywordList']>;
    setStartDate: UpdateFunction<TrendingQuery['startDate']>;
    initializeTrendingQuery: () => void;
  };
}

const TrendingQueryContext = createContext<TrendingQueryState | null>(null);

export const useTrendingQueryContext = (componentName: string) => {
  const context = useContext(TrendingQueryContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <TrendingQueryContextProvider>기 존재하지 않습니다.`,
    );
  }
  return context;
};

const TrendingQueryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trendingQuery, setTrendingQuery] = useState<TrendingQuery>({
    categoryList: [],
    keywordList: [],
    startDate: dayjs().startOf('week').subtract(1, 'week').add(1, 'day'),
  });

  // selectOptions를 업데이트하는 setter
  const setCategoryList = (
    updateCategoryList: (
      prevCategoryList: TrendingQuery['categoryList'],
    ) => TrendingQuery['categoryList'],
  ) => {
    setTrendingQuery((prevState) => ({
      ...prevState,
      categoryList: updateCategoryList(prevState.categoryList),
    }));
  };

  // keywordList를 업데이트하는 setter
  const setKeywordList = (
    updateKeywordList: (
      prevKeywordList: TrendingQuery['keywordList'],
    ) => TrendingQuery['keywordList'],
  ) => {
    setTrendingQuery((prevState) => ({
      ...prevState,
      keywordList: updateKeywordList(prevState.keywordList),
    }));
  };

  // startDate를 업데이트하는 setter
  const setStartDate = (
    updateStartDate: (
      prevStartDate: TrendingQuery['startDate'],
    ) => TrendingQuery['startDate'],
  ) => {
    setTrendingQuery((prevState) => ({
      ...prevState,
      startDate: updateStartDate(prevState.startDate),
    }));
  };

  const initializeTrendingQuery = () => {
    setTrendingQuery({
      categoryList: [],
      keywordList: [],
      startDate: dayjs('2024-01-17'),
    });
  };
  return (
    <TrendingQueryContext.Provider
      value={{
        trendingQuery: trendingQuery,
        trendingQueryActions: {
          setTrendingQuery,
          setCategoryList,
          setKeywordList,
          setStartDate,
          initializeTrendingQuery,
        },
      }}
    >
      {children}
    </TrendingQueryContext.Provider>
  );
};

export default TrendingQueryContextProvider;
