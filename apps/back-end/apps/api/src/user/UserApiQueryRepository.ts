import { User } from '../../../../libs/entity/src/domain/user/User.entity';
import { Repository } from 'typeorm';

export class UserApiQueryRepository extends Repository<User> {}
