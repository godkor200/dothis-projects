import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { User as UserType } from '@Apps/api/src/auth/v1/dto/user.dto';
import { Request } from 'express';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  googleLogin(req: Request) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async validateUser(user: UserType) {
    const res = await this.userRepository.findOneBy({ userEmail: user.email });
    if (res) return res;
    const newUser = this.userRepository.create({
      userEmail: user.email,
      channelId: 1231231,
      tokenRefresh: user.refreshToken,
      tokenExpires: '3000',
      tokenAccess: user.accessToken,
      agreePromotion: '',
      plan: '11',
      isAdmin: true,
      status: 'vitality',
    });
    return this.userRepository.save(newUser);
  }
}
