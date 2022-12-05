import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserDto } from '@Libs/entity/src/models/user/user.model';
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

  async validateUser(user: UserDto) {
    const res = await this.userRepository.findOneBy({
      userEmail: user.userEmail,
    });
    if (res) return res;
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
}
