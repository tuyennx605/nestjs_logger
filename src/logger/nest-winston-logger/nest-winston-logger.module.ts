import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { MyCustomTransport, transportDailyFile, transportHttp, transportMaxSize, transportMongodb, transportsConsole } from './nest-winston-logger.transports';
import { transportsCommon } from './nest-winston-logger.config';

const logFormatDefault = winston.format.combine(
  winston.format.label({ label: process.env.serviceName || 'name_app'}),
  winston.format.timestamp({
    format: transportsCommon.formatDate,
  }),
  winston.format.errors({ stack: true }),
  winston.format.json({
     space: 0, // khoảng trắng vào json, 0 là in ra liền giống JSON.stringtify, còn 2 trở lên là sẽ dễ đọc hơn
    }),
);

@Module({
  imports: [
    WinstonModule.forRoot({
      format: logFormatDefault,
      transports: [
        transportsConsole,
        transportMaxSize,
        transportDailyFile,
        transportHttp,
        MyCustomTransport,
        transportMongodb,
      ],
    }),
  ],
})
export class NestWinstonLoggerModule {}
