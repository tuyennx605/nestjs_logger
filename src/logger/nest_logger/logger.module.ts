import { Module } from '@nestjs/common';
import { NestLoggerService } from './logger.service';

@Module({
  providers: [NestLoggerService],
  exports: [NestLoggerService],
})
export class NestLoggerModule {}
