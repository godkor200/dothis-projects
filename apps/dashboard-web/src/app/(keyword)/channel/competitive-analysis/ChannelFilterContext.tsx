import { createContext, useContext, useState } from 'react';

import { clustersCategoriesOptions } from '@/constants/clusterCategories';
import type { SubscriberRangeValue } from '@/constants/subscribersRange';
import { subscribersRangeOptions } from '@/constants/subscribersRange';

type ClusterCategory = (typeof clustersCategoriesOptions)[0];

interface SubscriberRange {
  value: SubscriberRangeValue;
  label: string;
}

interface ChannelFilterState {
  channelCategory: ClusterCategory | null;
  setChannelCategory: React.Dispatch<
    React.SetStateAction<ClusterCategory | null>
  >;
  clustersCategoriesOptions: typeof clustersCategoriesOptions;

  subscriberRange: SubscriberRange | null;
  setSubscriberRange: React.Dispatch<
    React.SetStateAction<SubscriberRange | null>
  >;
  subscribersRangeOptions: typeof subscribersRangeOptions;
}

const ChannelFilterContext = createContext<ChannelFilterState | null>(null);

export const useChannelFilterContext = (componentName: string) => {
  const context = useContext(ChannelFilterContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <ChannelFilterContextProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const ChannelFilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [channelCategory, setChannelCategory] =
    useState<ClusterCategory | null>(null); //

  const [subscriberRange, setSubscriberRange] =
    useState<SubscriberRange | null>(null); //

  return (
    <ChannelFilterContext.Provider
      value={{
        channelCategory,
        setChannelCategory,
        clustersCategoriesOptions,
        subscriberRange,
        setSubscriberRange,
        subscribersRangeOptions,
      }}
    >
      {children}
    </ChannelFilterContext.Provider>
  );
};

export default ChannelFilterContextProvider;
