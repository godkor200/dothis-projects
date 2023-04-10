import { AuthRepositoryPort } from '@Apps/modules/auth/v1/db/auth.repository.port';
import { UserRepository } from '@Apps/modules/user/db/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
