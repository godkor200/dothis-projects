import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { User } from '@Libs/entity/src/domain/user/User.entity';
export interface UserRepositoryPort extends RepositoryPort<User> {
  // findOneById(id: string): Promise<User>;
}
