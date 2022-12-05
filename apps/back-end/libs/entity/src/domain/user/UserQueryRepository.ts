import { Repository } from 'typeorm';
import { User } from './User.entity';
import { CustomRepository } from '@Libs/commons/src/typeorm/type-orm-ext.decorater';

@CustomRepository(User)
export class UserQueryRepository extends Repository<User> {}
