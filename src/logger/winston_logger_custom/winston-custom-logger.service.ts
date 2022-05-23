import * as winston from 'winston';
import { Logger, LoggerService } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { MyCustomTransport, transportDailyFile, transportHttp, transportMaxSize, transportMongodb, transportsConsole } from './winston-custom-logger.transports';
import { transportsCommon } from './winston-custom-logger.config';

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


// https://github.com/winstonjs/winston
@Injectable()
export class MyLoggerCustomWinston implements LoggerService {
  private winston;
  private contextName;
  constructor() {
    // super();
    this.winston = winston.createLogger({
      format: logFormatDefault,
      defaultMeta: { service: this.contextName },
      transports: [
        transportsConsole,
        transportMaxSize,
        transportDailyFile,
        transportHttp,
        MyCustomTransport,
        // transportMongodb,
      ],
    });

  }
  setContextName(contextName) {
    this.contextName = contextName;
  }

  // 0
  error(message: any, key?: string) {
    this.winston.log({
      level: 'error',
      message,
      contextName: this.contextName,
      key,
    });
  }

  //1
  warn(message: any, key?: string) {
    this.winston.log({
      level: 'warn',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 2
  log(message: any, key?: string) {
    this.winston.log({
      level: 'info',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 2
  info(message: any, key?: string) {
    this.winston.log({
      level: 'info',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 3
  http(message: any, key?: string) {
    this.winston.log({
      level: 'http',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 4
  verbose(message: any, key?: string) {
    this.winston.log({
      level: 'verbose',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 5
  debug(message: any, key?: string) {
    this.winston.log({
      level: 'debug',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 6
  silly(message: any, key?: string) {
    this.winston.log({
      level: 'silly',
      message,
      contextName: this.contextName,
      key,
    });
  }
}
