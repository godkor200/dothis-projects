import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
  MySqlConfigModule,
  TypeOrmConfigService,
} from 'apps/api/src/config/database/database.mysql';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [MySqlConfigModule],
  useClass: TypeOrmConfigService,
  inject: [TypeOrmConfigService],
};

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class TypeormModule {}
