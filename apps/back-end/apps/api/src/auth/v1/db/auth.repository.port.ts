import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { User } from '@Libs/entity/src/domain/user/User.entity';

export interface AuthRepositoryPort extends RepositoryPort<User> {}
