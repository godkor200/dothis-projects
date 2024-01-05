export interface OsRes<T, S = undefined> {
  _index: string;
  _id: string;
  _score: number;
  _source?: T;
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
export interface IdocRes<T> {
  _index: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  found: boolean;
  _source: T;
}

interface Headers {
  date: string;
  'content-type': string;
  'content-length': string;
  connection: string;
  'access-control-allow-origin': string;
}

interface Connection {
  url: string;
  id: string;
  headers: Record<string, unknown>;
  deadCount: number;
  resurrectTimeout: number;
  _openRequests: number;
  status: string;
  roles: Record<string, unknown>;
}

interface Meta {
  context: null;
  request: {
    params: Record<string, unknown>;
    options: Record<string, unknown>;
    id: number;
  };
  name: string;
  connection: Connection;
  attempts: number;
  aborted: boolean;
}

export interface IIndicesServerResponse<T> {
  body: T[];
  statusCode: number;
  headers: Headers;
  meta: Meta;
}
