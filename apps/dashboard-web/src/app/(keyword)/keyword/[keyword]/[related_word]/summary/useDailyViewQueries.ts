import {
  COMBINE_DAILY_EXPECTED_KEY,
  DAILYVIEW_KEY,
} from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

const useDailyViewQueries = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResults = apiClient(2).hits.getAnalysisHitsV2.useQueries({
    queries: relatedKeywords.map((relatedKeyword) => {
      return {
        queryKey: COMBINE_DAILY_EXPECTED_KEY.list([
          { baseKeyword, relatedKeyword, startDate, endDate },
        ]),
        query: {
          search: baseKeyword,
          related: relatedKeyword ?? undefined,
          from: startDate,
          to: endDate,
        },
        enabled: !!startDate && !!endDate && !!baseKeyword && !!relatedKeyword,
      };
    }),
  });

  //   const filterArray = queryResults.filter((queryResult, index) => {
  // return queryResult.data?.body.data.
  //   });

  const flat = queryResults.flatMap((queryResult, index) => {
    return {
      data: queryResult.data?.body.data.data,
      keyword: relatedKeywords[index],
    };
  });

  // const filter = flat.filter((queryResult) => queryResult.data !== undefined);

  return {
    ...queryResults,
    data: flat,
  };
};

export default useDailyViewQueries;
