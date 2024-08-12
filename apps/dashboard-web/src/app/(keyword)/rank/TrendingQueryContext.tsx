import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

export type TrendingQuery = {
  selectOptions: { value: number; label: string }[];
  keywordList: string[];
  startDate: Dayjs;
};

interface TrendingQueryState {
  trendingQueryOption: TrendingQuery;
  setTrendingQueryOption: React.Dispatch<React.SetStateAction<TrendingQuery>>;
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
  const [trendingQueryOption, setTrendingQueryOption] = useState<TrendingQuery>(
    {
      selectOptions: [],
      keywordList: [],
      startDate: dayjs().startOf('week').subtract(2, 'week').add(1, 'day'),
    },
  );

  return (
    <TrendingQueryContext.Provider
      value={{
        trendingQueryOption: trendingQueryOption,
        setTrendingQueryOption: setTrendingQueryOption,
      }}
    >
      {children}
    </TrendingQueryContext.Provider>
  );
};

export default TrendingQueryContextProvider;
