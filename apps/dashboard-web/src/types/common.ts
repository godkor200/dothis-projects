export type SortingQuery<T> = {
  sort: T;
  order: 'asc' | 'desc';
};

export type TKeywords = {
  baseKeyword: string;
  relatedKeyword: string | null;
};
