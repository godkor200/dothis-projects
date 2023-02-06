import { UserRepositoryPort } from '@Apps/api/src/user/v1/db/user.repository.port';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { IResDto } from '@Libs/commons/src/types/res.types';

export class MockGetUser implements UserRepositoryPort {
  private readonly result: User;

  constructor(result: User) {
    this.result = result;
  }

  findOneById(id: string): Promise<User> {
    return Promise.resolve(this.result);
  }

  delete(id: string): Promise<boolean> {
    return Promise.resolve(!!this.result);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve([this.result]);
  }

  findAllPaginated(params: any): any {
    return Promise.resolve(undefined);
  }

  findOneByEmail(userEmail: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  insert(entity: User): Promise<IResDto> {
    return Promise.resolve({ success: true });
  }

  transaction<T>(handler: () => Promise<T>): Promise<void | T> {
    return Promise.resolve(undefined);
  }

  updateRefreshToken(id: number, token: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
