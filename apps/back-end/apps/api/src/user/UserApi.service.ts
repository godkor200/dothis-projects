import { User } from '../../../../libs/entity/src/domain/user/User.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserApiQueryRepository } from './UserApiQueryRepository';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) // private readonly userApiQueryRepository: UserApiQueryRepository,
  {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
