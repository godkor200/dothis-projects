import { AuthRepositoryPort } from '@Apps/modules/auth/v1/db/auth.repository.port';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@Apps/modules/user/v1/db/user.repository';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
