import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  User,
  UserWithGoogleToken,
} from '@Libs/entity/src/domain/user/User.entity';
import { UserDto } from '@dothis/share/lib/dto';
import { Request } from 'express';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req: Request) {
    if (!req.user)
      return {
        message: 'No user from google',
        user: null,
        siteToken: null,
      };

    const {
      userId,
      accessToken: googleAccessToken,
      refreshToken: googleRefreshToken,
    } = req.user as UserWithGoogleToken;

    const { token: accessToken, maxAge: accessTokenMaxAge } =
      this.accessToken(userId);

    const { token: refreshToken, maxAge: refreshTokenMaxAge } =
      this.refreshToken(userId);

    await this.setCurrentRefreshToken(refreshToken, userId);

    return {
      message: 'User information from google',
      user: req.user,
      googleToken: {
        googleAccessToken,
        googleRefreshToken,
      },
      siteToken: {
        accessToken,
        accessTokenMaxAge,
        refreshToken,
        refreshTokenMaxAge,
      },
    };
  }

  async validateUser(user: UserDto) {
    const res = await this.userRepository.findOneBy({
      userEmail: user.userEmail,
    });

    if (res) return res;

    const newUser = this.userRepository.create({
      userEmail: user.userEmail,
      isAdmin: false,
    });

    return this.userRepository.save(newUser);
  }

  refreshToken(payload: number) {
    const token = this.jwtService.sign(
      { userId: String(payload) },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );

    return {
      token,
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRESIN) * 1000,
    };
  }

  accessToken(payload: number) {
    const token = this.jwtService.sign(
      { userId: String(payload) },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    return {
      token,
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRESIN) * 1000,
    };
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    await this.userRepository.update(
      { userId: id },
      { tokenRefresh: refreshToken },
    );
  }
  decodeToken(token: string) {
    const res = this.jwtService.decode(token);
    if (!res || typeof res === 'string')
      throw new HttpException('message', HttpStatus.UNAUTHORIZED);
    return res;
  }

  async getUserDataById(id: string) {
    return await this.userRepository.findOneBy({ userId: +id });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    /**
     * 쿼리로 함수 따로 만들기
     */
    const userData = await this.getUserDataById(id);

    return userData.tokenRefresh === refreshToken;
  }
}
