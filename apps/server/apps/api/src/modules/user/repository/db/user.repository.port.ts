import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { User } from '../entity/user.entity';

export interface UserRepositoryPort extends RepositoryPort<User> {
  findOneByEmail(userEmail: string): Promise<User>;
  updateRefreshToken(id: number, token: string): Promise<void>;
  findOneWithRelations(id: string): Promise<User>;
}
