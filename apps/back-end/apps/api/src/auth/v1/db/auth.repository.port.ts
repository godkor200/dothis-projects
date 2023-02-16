import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';

export interface AuthRepositoryPort extends RepositoryPort<User> {}
