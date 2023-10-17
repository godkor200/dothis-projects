import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 추 후  라우팅가드를 위한 middleware 파일 생성 (기획단과 상의 후 라우팅 가드 적용 예정)
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  return response;

  // if (request.nextUrl.pathname.startsWith('/chart')) {
  //   const response = NextResponse.redirect(
  //     new URL('/about?search=dashboard', request.nextUrl),
  //   );
  //   response.cookies.set('test', 'test');
  //   return response;
  // }
}

export const config = {
  matcher: '/:path*',
};
