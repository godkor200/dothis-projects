import { Request, Response } from 'express';
// 쿠키 설정 함수
export function setCookie(res: Response, name: string, value: string) {
  res.cookie(name, value, {
    domain:
      process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
        ? '.dothis.kr'
        : 'localhost',
    path: '/',
    httpOnly: true,
  });
}
