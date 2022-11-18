import { Repository } from 'typeorm';
import { User } from './User.entity';
import { CustomRepository } from '../../../../commons/typeorm/type-orm-ext.decorater';

@CustomRepository(User)
export class UserQueryRepository extends Repository<User> {}
