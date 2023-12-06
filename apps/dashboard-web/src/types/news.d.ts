export type Documents = {
  news_id: string;
  byline: string;
  category: Array<string>;
  category_incident: Array<string>;
  dateline: string;
  enveloped_at: string;
  hilight: string;
  images: string;
  provider: string;
  provider_link_page: string;
  provider_news_id: string;
  published_at: string;
  title: string;
};
export interface ServerResponse<T = null> {
  status: { code: number; message: string };
  content: T;
  nextPage?: number;
}

export type NewsResponse = {
  result: number;
  return_object: { documents: Array<Documents>; total_hits: number };
};
