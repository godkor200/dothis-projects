export const pageKeys = {
  home: 'home',
} as const;

export type PageKeys = (typeof pageKeys)[keyof typeof pageKeys];

export const pagePath = {
  [pageKeys.home]: () => '/',
} satisfies Record<PageKeys, unknown>;
