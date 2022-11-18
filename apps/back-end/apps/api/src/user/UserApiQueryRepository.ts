import { Repository } from 'typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';

export class UserApiQueryRepository extends Repository<User> {}
