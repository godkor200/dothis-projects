export const serverApiBaseUrl = 'https://api.dothis.world/v1' as const;

export const mockApiHost = 'http://localhost:3667' as const;
export const mockApiPathname = '/api/mock' as const;
export const mockApiBaseUrl = `${mockApiHost}${mockApiPathname}` as const;

export const apiBaseUrl =
  process.env['NEXT_PUBLIC_API_MOCKING'] === 'enabled'
    ? mockApiBaseUrl
    : serverApiBaseUrl;
