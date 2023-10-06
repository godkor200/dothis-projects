import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieValidationMiddleware implements NestMiddleware {
  /**
   *     cookie: {
   *       refreshToken: string;
   *       google_access_token: string;
   *       google_refresh_token: string;
   *     },
   * @param req
   * @param res
   * @param next
   */
  use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies['refreshToken'];
    // const req.cookies['google_access_token'];
    //  req.cookies['google_refresh_token'];
    if (!refreshToken) {
      // 쿠키가 없는 경우 에러 처리
      throw new UnauthorizedException('refreshToken Cookie is missing');
    }

    // 여기에서 추가적인 쿠키 유효성 검사 로직을 작성할 수 있습니다.
    // 예: JWT 토큰 유효성 확인 등

    next();
  }
}
