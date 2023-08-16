import { AuthRepositoryPort } from '@Apps/common/auth/repository/db/auth.repository.port';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
