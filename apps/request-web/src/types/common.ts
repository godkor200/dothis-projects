import type { UrlObject } from 'url';

export type NextjsUrl = UrlObject | string;

type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : any;
