import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserDto } from '@Libs/entity/src/models/user/user.model';
import { Request } from 'express';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req: Request) {
    if (!req.user) {
      return 'No user from google';
    }
    const userId = (req.user as User).userId;

    const { token: accessToken, maxAge: accessTokenMaxAge } =
      this.accessToken(userId);

    const { token: refreshToken, maxAge: refreshTokenMaxAge } =
      this.refreshToken(userId);

    await this.setCurrentRefreshToken(refreshToken, userId);

    return {
      message: 'User information from google',
      user: req.user,
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
    /**
     * 현재 채널아이디가 오지 않기 때문에 임의로 데이터를 넣음
     */
    const newUser = this.userRepository.create({
      userEmail: user.userEmail,
      channelId: 1231231,
      tokenRefresh: user.tokenRefresh,
      tokenExpires: 3000,
      tokenAccess: user.tokenAccess,
      agreePromotion: '',
      plan: '11',
      isAdmin: true,
      status: 'vitality',
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

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {}
}
