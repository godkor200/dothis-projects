import { Module } from '@nestjs/common';
import { SetValueController } from '@Apps/modules/cashe/v1/commands/set-value/set-value.controller';

const controllers = [SetValueController];

@Module({
  imports: [],
  controllers,
})
export class CacheV1Module {}
