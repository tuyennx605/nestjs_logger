import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { NestWinstonLoggerModule } from './logger/nest-winston-logger/nest-winston-logger.module';
import { MyLoggerCustomWinstonModule } from './logger/winston_logger_custom/winston-custom-logger.module';
// import { NestLoggerModule } from './logger/nest_logger/logger.module';

@Module({
  imports: [
    // NestLoggerModule,
    MyLoggerCustomWinstonModule,
    // NestWinstonLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
