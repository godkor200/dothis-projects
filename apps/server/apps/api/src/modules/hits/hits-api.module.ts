import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { HitsV1Module } from '@Apps/modules/hits/hits-v1.module';
import { HitsV2Module } from '@Apps/modules/hits/hits-v2.module';

@Module({
  imports: [
    HitsV1Module,
    HitsV2Module,
    RouterModule.register([{ path: 'v1', module: HitsV1Module }]),
    RouterModule.register([{ path: 'v2', module: HitsV2Module }]),
  ],
})
export class HitsApiModule {}
