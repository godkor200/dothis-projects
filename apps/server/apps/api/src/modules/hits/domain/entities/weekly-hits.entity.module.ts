import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeeklyHitsEntity])],
  exports: [TypeOrmModule],
})
export class WeeklyHitsEntityModule {}
