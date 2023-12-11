import type { ViewData } from '@/components/MainContents/MonthlyContentReport/MonthlyViewData';

const getMaxValues = (data: ViewData[]) => {
  let maxViews = 1;
  let maxVideoTotalCounts = 1;

  data.forEach((item) => {
    maxViews = Math.max(maxViews, item.views);
    maxVideoTotalCounts = Math.max(maxVideoTotalCounts, item.videoTotalCounts);
  });

  const viewAndVideoMaxValue = Math.max(maxViews, maxVideoTotalCounts);

  return { maxViews, maxVideoTotalCounts, viewAndVideoMaxValue };
};

export default getMaxValues;
