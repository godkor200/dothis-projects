import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from '@Apps/config/database/database.mysql';

@Module({
  providers: [TypeOrmConfigService],
})
export class MySqlConfigModule {}
