import { User } from '@Apps/modules/user/domain/user.entity';
import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';

export interface AuthRepositoryPort extends RepositoryPort<User> {}
