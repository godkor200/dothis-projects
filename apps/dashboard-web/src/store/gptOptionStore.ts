import { create } from 'zustand';

interface GptOptionActios {
  setTotalDailyView: (value: number | null) => void;
  setDailyViewTendency: (value: number | null) => void;
  setVideoCount: (value: number | null) => void;
  setCompetitionScore: (value: number | null) => void;
  setHigherSubscribedChannelsCount: (value: number | null) => void;
  setRelatedNews: (fn: (prev: string[]) => string[]) => void;
  setRelatedVideo: (fn: (prev: string[]) => string[]) => void;
  initializeGptOption: () => void;
}

interface GptOptionState {
  totalDailyView: number | null;
  dailyViewTendency: number | null;
  videoCount: number | null;
  competitionScore: number | null;
  higherSubscribedChannelsCount: number | null;
  relatedNews: string[];
  relatedVideo: string[];

  actions: GptOptionActios;
}

export const gptOptionStore = create<GptOptionState>((set, get) => ({
  totalDailyView: null,
  dailyViewTendency: null,
  videoCount: null,
  competitionScore: null,
  higherSubscribedChannelsCount: null,
  relatedNews: [],
  relatedVideo: [],
  actions: {
    setTotalDailyView: (value: number | null) =>
      set(() => ({ totalDailyView: value })),
    setDailyViewTendency: (value: number | null) =>
      set(() => ({ dailyViewTendency: value })),
    setVideoCount: (value: number | null) => set(() => ({ videoCount: value })),
    setCompetitionScore: (value: number | null) =>
      set(() => ({ competitionScore: value })),
    setHigherSubscribedChannelsCount: (value: number | null) =>
      set(() => ({ higherSubscribedChannelsCount: value })),
    setRelatedNews: (fn: (prev: string[]) => string[]) => {
      set((state) => ({ relatedNews: fn(state.relatedNews) }));
    },
    setRelatedVideo: (fn: (prev: string[]) => string[]) => {
      set((state) => ({ relatedVideo: fn(state.relatedVideo) }));
    },
    initializeGptOption: () =>
      set(() => ({
        totalDailyView: null,
        dailyViewTendency: null,
        videoCount: null,
        competitionScore: null,
        higherSubscribedChannelsCount: null,
        relatedNews: [],
        relatedVideo: [],
      })),
  },
}));

// State
export const useGptOption = () =>
  gptOptionStore(
    ({
      totalDailyView,
      dailyViewTendency,
      videoCount,
      competitionScore,
      higherSubscribedChannelsCount,
      relatedNews,
      relatedVideo,
    }) => ({
      totalDailyView,
      dailyViewTendency,
      videoCount,
      competitionScore,
      higherSubscribedChannelsCount,
      relatedNews,
      relatedVideo,
    }),
  );

// Actions
export const useGptOptionAction = () =>
  gptOptionStore((state) => state.actions);
