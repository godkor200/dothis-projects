import { User } from '@Apps/modules/user/domain/user.entity';
import { RepositoryPort } from '@Libs/commons';

export interface AuthRepositoryPort extends RepositoryPort<User> {}
