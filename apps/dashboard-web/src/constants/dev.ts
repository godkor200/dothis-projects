export const serverApiBaseUrl = 'https://api.dothis.kr/v1' as const;

// http://localhost:8080/v1
// 'https://api.dothis.kr/v1'
export const mockApiHost = 'http://localhost:3667' as const;
export const mockApiPathname = '/api/mock' as const;
export const mockApiBaseUrl = `${mockApiHost}${mockApiPathname}` as const;

export const apiBaseUrl =
  process.env['NEXT_PUBLIC_API_MOCKING'] === 'enabled'
    ? mockApiBaseUrl
    : serverApiBaseUrl;
