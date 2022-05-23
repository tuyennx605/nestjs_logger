
// import { Inject, Injectable, LoggerService } from '@nestjs/common';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

// @Injectable()
// export class AppService {
//   constructor(
//     @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
//   ){}
//   getHello(): string {
//     this.logger.error(`error111111`);
//     this.logger.warn(`warn111111`);
//     this.logger.log('info111111');
//     this.logger.verbose(`verbose111111`);
//     this.logger.debug(`debug111111`);
    
//     // json
//     this.logger.error({message: {a: 1, b: 2}});
//     try {
//       let a: any;
//       console.log(a.x.y);
//     } catch (error) {
//       this.logger.error(error);
//     }

//     return 'Hello World!';
//   }
// }






////////////////////// winston logger custom

import { Injectable } from '@nestjs/common';
import { MyLoggerCustomWinston } from './logger/winston_logger_custom/winston-custom-logger.service';

@Injectable()
export class AppService {
  constructor(
    private logger: MyLoggerCustomWinston,
  ){
    this.logger.setContextName(AppService.name);
  }
  getHello(): string {
    this.logger.error(`error111111`, 'KEY_123');
    this.logger.warn(`warn111111`, 'KEY_123');
    this.logger.log('info111111', 'KEY_123');
    this.logger.verbose(`verbose111111`, 'KEY_123');
    this.logger.debug(`debug111111`, 'KEY_123');
    
    // json
    this.logger.error({message: {a: 1, b: 2}});

    try {
      let a: any;
      console.log(a.x.y);
    } catch (error) {
      this.logger.error(error, 'KEY_123');

    }
    return 'Hello World!';
  }
}







/////////////////////////////////// nest logger /////////////////////

// import { Injectable } from '@nestjs/common';
// import { NestLoggerService } from './logger/nest_logger/logger.service';

// @Injectable()
// export class AppService {
//   constructor(
//     // khoi tao log
//     private readonly nestLogger: NestLoggerService
//   ){
//     // set name cho logs
//     this.nestLogger.setContext(AppService.name);
//   }
//   getHello(): string {
//     this.nestLogger.info('đây là logs này!!!!', 'KEY_CUA_LOGS');

//     console.log(`tuyennx 123`);
//     console.error(`tuyennx error`);
//     console.info(`tuyennx info`);
//     console.warn(`tuyennx warn`);


//     console.time('KEY_TIME');

//     // code

//     console.timeEnd('KEY_TIME');


//     return 'Hello World!';
//   }
// }
