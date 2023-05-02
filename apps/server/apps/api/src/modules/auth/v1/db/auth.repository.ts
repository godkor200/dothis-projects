import { AuthRepositoryPort } from 'apps/api/src/modules/auth/v1/db/auth.repository.port';
import { UserRepository } from 'apps/api/src/modules/user/repository/db/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
