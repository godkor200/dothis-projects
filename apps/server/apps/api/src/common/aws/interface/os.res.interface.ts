export interface OsRes<T, S = undefined> {
  _index: string;
  _id: string;
  _score: number;
  _source: T;
  inner_hits?: S;
}
export interface INested {
  field: string;
  offset: number;
}

export interface Hit<T> {
  _index: string;
  _id: string;
  _nested: INested;
  _score: number;
  _source: T;
}

export interface Hits<T> {
  total: {
    value: number;
    relation: string;
  };
  max_score: number;
  hits: Hit<T>[];
}

export interface HitList<TS> {
  hits: Hits<TS>;
}
