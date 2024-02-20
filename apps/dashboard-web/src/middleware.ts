import axios from 'axios';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { apiServer } from './utils/api/apiServer';

// 추 후  라우팅가드를 위한 middleware 파일 생성 (기획단과 상의 후 라우팅 가드 적용 예정)
export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/contents')) {
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set(
  //     'Authorization',
  //     request.cookies.get('accessToken')?.value as string,
  //   );
  //   const data = await fetch('https://api.dothis.kr/v2/user/keyword', {
  //     // headers: requestHeaders,
  //   });
  //   const responseData = await data.json();
  //   if (responseData.statusCode === 401) {
  //     const auth = await fetch('https://api.dothis.kr/v1/auth/verify-token', {
  //       credentials: 'include',
  //     });
  //     console.log(auth);
  //     const authResponse = await auth.json();
  //     console.log(authResponse);
  //   }
  //   const response = NextResponse.redirect(
  //     new URL('/about?search=dashboard', request.nextUrl),
  //   );
  //   response.cookies.set('test', 'test');
  //   return response;
  // }
  // 랜덤으로 게스트 키워드 생성해주는 코드 (아래)
  // if (
  //   request.nextUrl.pathname.startsWith('/contents') &&
  //   !request.nextUrl.searchParams.has('guestKeyword')
  // ) {
  //   const test = ['check', 'phone', 'rice', 'paper', 'news', 'date'];
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set(
  //     'Authorization',
  //     request.cookies.get('accessToken')?.value as string,
  //   );
  //   const data = await fetch('https://api.dothis.kr/v1/auth/own-info', {
  //     headers: {
  //       Authorization: request.cookies.get('accessToken')?.value as string,
  //     },
  //   });
  //   const responseData = await data.json();
  //   // console.log(responseData.data.personalizationTag);
  //   return NextResponse.redirect(
  //     new URL(
  //       `/contents?guestKeyword=${test[Math.floor(Math.random() * 6)]}`,
  //       request.nextUrl,
  //     ),
  //   );
  // }

  // if (
  //   request.headers.get('referer') === null &&
  //   request.headers.get('sec-fetch-site') === 'none'
  // ) {
  //   return NextResponse.redirect(new URL(`/about`, request.nextUrl));
  // }

  const response = NextResponse.next();
  return response;
}

export const config = {
  // matcher: '/:path*',
  matcher: ['/contents', '/mypage'],
};
