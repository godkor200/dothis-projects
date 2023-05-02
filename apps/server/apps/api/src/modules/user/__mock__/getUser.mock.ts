import { UserRepositoryPort } from 'apps/api/src/modules/user/repository/db/user.repository.port';
import { IResDto } from '@Libs/commons/src/types/res.types';
import { updateObject } from '@Libs/commons/src';
import { User } from '../repository/entity/user.entity';

export class MockGetUser implements UserRepositoryPort {
  private readonly result: User;

  constructor(result: User) {
    this.result = result;
  }
  updateOne(option: updateObject): Promise<IResDto> {
    throw new Error('Method not implemented.');
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

  findOneWithRelations(id: string): Promise<User> {
    return Promise.resolve(this.result);
  }
}
