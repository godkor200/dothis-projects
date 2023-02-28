import type { UrlObject } from 'url';

export type NextjsUrl = UrlObject | string;
export type NextLayoutProps<P = {}> = { children: React.ReactNode } & P;
