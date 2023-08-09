import { Request, Response } from 'express';

export function envDiscrimination(req: Request): boolean {
  return req.host.includes('localhost');
}

// 쿠키 설정 함수
export function setCookie(
  req: Request,
  res: Response,
  name: string,
  value: string,
) {
  return res.cookie(name, value, {
    domain: envDiscrimination(req) ? '.dothis.kr' : 'localhost',
    path: '/',
    httpOnly: true,
  });
}
