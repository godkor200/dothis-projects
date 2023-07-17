export const PAGE_KEYS = {
  home: 'home',
  ranking: 'ranking',
  viewPostRequest: 'viewPostRequest',
  newPostRequest: 'newPostRequest',
  notice: 'notice',
  qna: 'qna',
  user: 'user',
  serviceCenter: 'serviceCenter',
  login: 'login',
  userRequestPost: 'userRequestPost',
  account: 'account',
} as const;

export const API_KEYS = {
  loginSessionExpiration: 'loginSessionExpiration',
};

// 페이지 url을 필요한 query를 받아 generate
export const pagePath = {
  // 홈
  [PAGE_KEYS.home]: () => ({
    pathname: '/',
  }),
  // 랭킹
  // [PAGE_KEYS.ranking]: () => ({
  //   pathname: 'ranking',
  // }),

  /* request-post */
  // 새 요청
  [PAGE_KEYS.newPostRequest]: () => ({
    pathname: '/request-post/new',
  }),
  // 요청 상세
  [PAGE_KEYS.viewPostRequest]: (query: { requestId: string }) => ({
    pathname: `/request-post/view`,
    query,
  }),

  /* user */
  // 유저 , 크리에이터 페이지
  [PAGE_KEYS.user]: (query: { userId: string }) =>
    ({
      pathname: '/user',
      query,
    } as const),

  // 유저 요청글
  [PAGE_KEYS.userRequestPost]: (query?: { searchText?: string }) => ({
    pathname: '/user/request-post',
    query,
  }),

  /* auth */
  // 로그인
  [PAGE_KEYS.login]: () => ({
    pathname: '/auth/login',
  }),

  /* inquiry */
  // 공지사항
  [PAGE_KEYS.notice]: () => ({
    pathname: '/inquiry/notice',
  }),
  // 계정
  [PAGE_KEYS.account]: () => ({
    pathname: '/inquiry/account',
  }),
};
export const apiPath = {
  [API_KEYS.loginSessionExpiration]: () => ({
    pathname: '/api/redirect/loginSessionExpiration',
  }),
};

export type PageKeys = keyof typeof PAGE_KEYS;
