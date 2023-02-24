import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { User } from '@Apps/config/database/domain/user/User.entity';

export interface AuthRepositoryPort extends RepositoryPort<User> {}
