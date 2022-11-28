import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from './Subscribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe])],
  exports: [TypeOrmModule],
})
export class SubscribeModule {}
