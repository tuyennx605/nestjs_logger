import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import {
  transportDailyFileConfig,
  transportHTTPConfig,
  transportMongodbConfig,
  transportsCommon,
  transportsConsoleConfig,
  transportsMaxSizeConfig,
} from './winston-custom-logger.config';
import { YourCustomTransport } from './winston-custom-logger.custom';
import * as winstonMongo from 'winston-mongodb'


// =======================>    https://github.com/winstonjs/winston/blob/master/docs/transports.md#winston-core  <================================

//////////////////////// transportsConsole

const logFormatConsole = winston.format.combine(
  winston.format.label({ label: process.env.serviceName || 'name_app' }),
  winston.format.timestamp({
    format: transportsCommon.formatDate,
  }),
  winston.format.errors({ stack: true }),
  // winston.format.prettyPrint(),
  winston.format.json({
    space: 0, // khoảng trắng vào json, 0 là in ra liền giống JSON.stringtify, còn 2 trở lên là sẽ dễ đọc hơn
  }),

  // winston.format.colorize({ all: false }),
  // winston.format.printf(
  //   ({ level, message, label, timestamp, meta }) => {
  //     return `${timestamp} [${label}] ${level}:${message} --- ${meta? JSON.stringify(meta) : ''}`;
  //   }
  // ),

  // winston.format.colorize({ level: true }), // màu sắc cho console. nhưng nó sẽ sinh ra một số ký tự đặc biệt
  // winston.format.printf(
  //   (info) => {
  //     return `[${info.level}] - ${info.timestamp} | ${JSON.stringify(info)}`;
  //   }
  // ),
);

export const transportsConsole = new winston.transports.Console({
  format: logFormatConsole,
  // level: 'info', // print: info, warn, error (trong tất cả: error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6)
  level: transportsConsoleConfig.level,
  silent: transportsConsoleConfig.silent, // bật tắt logs
});

///////////////////// transportFile by max size

const logFormatFile = winston.format.combine(
  winston.format.label({ label: process.env.serviceName || 'name_app' }),
  winston.format.errors({ stack: true }),
  winston.format.timestamp({
    format: transportsCommon.formatDate,
  }),

  winston.format.json({
    space: 0,
  }),
);

export const transportMaxSize = new winston.transports.File({
  level: transportsConsoleConfig.level,
  format: logFormatFile,
  filename: transportsMaxSizeConfig.filename, //đường đẫn tạo file
  maxsize: transportsMaxSizeConfig.maxSize, // 5MB
  silent: transportsMaxSizeConfig.silent,
});

////////////////////// transportDaily
const errorDailyRotateFile = {
  silent: transportDailyFileConfig.silent,
  filename: transportDailyFileConfig.filename,
  datePattern: transportDailyFileConfig.datePattern,
  zippedArchive: false,
  maxSize: transportDailyFileConfig.maxSize,
  maxFiles: transportDailyFileConfig.maxFiles,
  prepend: false,
  json: true,
};
export const transportDailyFile = new DailyRotateFile(errorDailyRotateFile);

//////////////////////////// transport HTTP
export const transportHttp = new winston.transports.Http({ // phuong thuc POST
  format: logFormatFile,
  silent: transportHTTPConfig.silent,
  host: transportHTTPConfig.host,
  port: transportHTTPConfig.port,
  path: transportHTTPConfig.path,  // endpoint http 
  // auth: {
  //   username: '',
  //   password: '',
  //   bearer: ''
  // },
});


/////////////////////// custom //////
export const MyCustomTransport = new YourCustomTransport({
  silent: true,
  level: transportsConsoleConfig.level,
  format: logFormatFile,
});



////////////////////////// transport mongodb : lưu logs vào mongodb /////////////
// https://www.npmjs.com/package/winston-mongodb
export const transportMongodb = new winstonMongo.MongoDB({
  silent: transportMongodbConfig.silent,
  db: transportMongodbConfig.db,
  level: transportMongodbConfig.level,
  collection: transportMongodbConfig.collection, // lưu vào bảng nào
  options: transportMongodbConfig.options,

  // chú ý, khi bật tắt capped phải xóa db đi, hoặc dùng query để set lại capped size
  capped: transportMongodbConfig.capped, // có bật giới hạn không ?
  cappedMax: transportMongodbConfig.cappedMax,  // giới hạn số lượng bản ghi, đến măx nó sẽ xóa các bản ghi cũ đi 
  // cappedSize: 100000, // giới hạn size của db

  // name: 'key',
  metaKey: transportMongodbConfig.metaKey,
  decolorize: transportMongodbConfig.decolorize, // xoá thuộc tính màu
  // label: 'LABEL',  // đặt label nếu muốn

  storeHost: transportMongodbConfig.storeHost,  // lưu tên máy chủ hay ko
  // expireAfterSeconds: 15, // document sẽ bị tự động xóa trong bao lâu. (chỉ hoạt động khi capped : false)
})