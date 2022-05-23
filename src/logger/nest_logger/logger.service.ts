import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class NestLoggerService extends Logger {


  public debug(message: any, key?: string): void {
    super.debug(JSON.stringify({type: 'DEBUG', key, message}));
  }

  public info(message: any, key?: string): void {
    // super.log(message, 'INFO');
    super.log(JSON.stringify({type: 'INFO', key, message}));
  }

  public warn(message: any, key?: string): void {
    // super.warn(message, 'WARN');
    super.warn(JSON.stringify({type: 'WARN', key, message}));
  }

  public error(message: any, key?: string): void {
    // super.error(message, 'ERROR');
    super.error(JSON.stringify({type: 'ERROR', key, message}));

    // this.trace();
  }

  public trace() {
    console.trace();
  }

  public fatal(message: any): void {
    super.error('====================== FATAL ERROR =====================');
    super.error(message, 'FATAL');

    this.trace(); // Prints out a stack trace

    process.exit(-1);
  }
}
