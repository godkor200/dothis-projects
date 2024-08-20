import { RepositoryPort } from '@Libs/commons';
import { User } from '../domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<User> {
  findOneByEmail(userEmail: string): Promise<User>;
  updateRefreshToken(id: number, token: string): Promise<void>;
  findOneWithRelations(id: string): Promise<User>;
}
