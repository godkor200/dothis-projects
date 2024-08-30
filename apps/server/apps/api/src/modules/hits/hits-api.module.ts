import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { HitsV1Module } from '@Apps/modules/hits/hits-v1.module';

@Module({
  imports: [
    HitsV1Module,
    RouterModule.register([{ path: 'v1', module: HitsV1Module }]),
  ],
})
export class HitsApiModule {}
