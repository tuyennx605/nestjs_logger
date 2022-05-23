import { forwardRef, Module } from '@nestjs/common';
// import { CatModule } from 'src/cat/cat.module';
import { MyLoggerCustomWinston } from './winston-custom-logger.service';

@Module({
  imports: [
    // forwardRef(() => CatModule),
  ],
  controllers: [],
  providers: [MyLoggerCustomWinston],
  exports: [MyLoggerCustomWinston],
})
export class MyLoggerCustomWinstonModule {}
