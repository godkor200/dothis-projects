import { AuthRepositoryPort } from '@Apps/common/auth/v1/db/auth.repository.port';
import { UserRepository } from '@Apps/modules/user/repository/db/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
