import { User } from '@Apps/modules/user/repository/entity/user.entity';
import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';

export interface AuthRepositoryPort extends RepositoryPort<User> {}
