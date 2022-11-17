import { Module } from '@nestjs/common';
import { AppService } from './core.service';

@Module({
  imports: [AppService],
  providers: [],
  exports: [],
})
export class AppModule {}
