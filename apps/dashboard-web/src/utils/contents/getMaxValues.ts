import type { ViewData } from '@/components/MainContents/MonthlyContentReport/MonthlyViewData';

interface ApexRadar {
  x: string;
  y: number;
}
export const getMaxValues = (data: ViewData[]) => {
  let maxViews = 1;
  let maxVideoTotalCounts = 1;

  data.forEach((item) => {
    maxViews = Math.max(maxViews, item.views);
    maxVideoTotalCounts = Math.max(maxVideoTotalCounts, item.videoTotalCounts);
  });

  const viewAndVideoMaxValue = Math.max(maxViews, maxVideoTotalCounts);

  return { maxViews, maxVideoTotalCounts, viewAndVideoMaxValue };
};

export const getMaxValuesV2 = (
  views: ApexRadar[],
  videoCounts: ApexRadar[],
) => {
  let maxViews = 1;
  let maxVideoTotalCounts = 1;

  views.forEach((item) => {
    maxViews = Math.max(maxViews, item.y);
  });

  videoCounts.forEach((item) => {
    maxVideoTotalCounts = Math.max(maxVideoTotalCounts, item.y);
  });

  const viewAndVideoMaxValue = Math.max(maxViews, maxVideoTotalCounts);

  return { maxViews, maxVideoTotalCounts, viewAndVideoMaxValue };
};
