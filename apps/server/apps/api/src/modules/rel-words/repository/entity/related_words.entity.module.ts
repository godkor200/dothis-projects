import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedWordsEntity } from './related_words.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelatedWordsEntity])],
  exports: [TypeOrmModule],
})
export class RelatedWordsModule {}
