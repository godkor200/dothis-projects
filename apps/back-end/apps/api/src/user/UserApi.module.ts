import { Module } from '@nestjs/common';
import { UserModule } from '../../../../libs/entity/src/domain/user/UserModule';
import { UserApiController } from './UserApi.controller';
import { UserApiService } from './UserApi.service';
import { UserApiQueryRepository } from './UserApiQueryRepository';

@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [UserApiService, UserApiQueryRepository],
})
export class UserApiModule {}
