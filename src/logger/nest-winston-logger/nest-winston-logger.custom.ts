import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { CatService } from 'src/cat/cat.service';
import * as Transport from 'winston-transport'


// https://github.com/winstonjs/winston#adding-custom-transports
export class YourCustomTransport extends Transport {
  // @Inject(forwardRef(() => CatService))
    // private catService : CatService
  constructor( opts ) {
    super(opts);
    // this.catService = new CatService(null);
    //
    // Consume any custom options here. e.g.:
    // - Connection information for databases
    // - Authentication information for APIs (e.g. loggly, papertrail,
    //   logentries, etc.).
    //
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    // console.log(898989898, info);
    
    // this.catService.aaa();

    // Perform the writing to the remote service
    callback();
  }
};