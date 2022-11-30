import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserApiQueryRepository } from './UserApiQueryRepository';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userApiQueryRepository: UserApiQueryRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
