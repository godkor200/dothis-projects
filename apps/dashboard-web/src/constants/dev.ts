// export const serverApiBaseUrl = 'https://api.dothis.kr/v1' as const;
// export const serverApiBaseUrl2 = 'https://api.dothis.kr/v2' as const;

// http://localhost:8080/v1
// 'https://api.dothis.kr/v1'
export const mockApiHost = 'http://localhost:3667' as const;
export const mockApiPathname = '/api/mock' as const;
export const mockApiBaseUrl = `${mockApiHost}${mockApiPathname}` as const;

export const BaseURL = 'https://api.dothis.kr';
// export const apiBaseUrl =
//   process.env['NEXT_PUBLIC_API_MOCKING'] === 'enabled'
//     ? mockApiBaseUrl
//     : serverApiBaseUrl;

export const isProduction = process.env.NODE_ENV === 'production';

export const serverApiBaseUrl: Record<number, string> = {
  1: 'https://api.dothis.kr/v1',
  2: 'https://api.dothis.kr/v2',
  3: 'https://api.dothis.kr/v3',
};

export const isServer = typeof window === 'undefined';
