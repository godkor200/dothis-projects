type Documents = {
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

type NewsResponse = {
  result: number;
  return_object: { documents: Array<Documents>; total_hits: number };
};
