export const transportsCommon = {
  formatDate : 'YYYY-MM-DD,hh:mm:ss sssZ'
}


// config console
export const transportsConsoleConfig = {
  silent: false, // bật tắt logs
  level: 'info',
}

export const transportsMaxSizeConfig = {
  silent: true, // bật tắt logs
  level: 'false',
  filename: 'logs/logs_size/logs.log',
  maxSize: 5242880, //5M
}

export const transportDailyFileConfig = {
  silent: true, // bật tắt logs
  filename: `logs/logs_daily/logs-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '10m',
  maxFiles: '14d',
}

export const transportHTTPConfig = {
  silent: true,
  host: 'localhost',
  port: 8080,
  path: 'my-add-logs',  // endpoint http 
}


// https://www.npmjs.com/package/mongodb-winston-transport
export const transportMongodbConfig = {
  silent: true,
  db: 'mongodb://127.0.0.1:27017/cats',
  level: "info",
  collection: 'logs', // lưu logs vào bảng nào
  options: { useUnifiedTopology: true },

  // chú ý, khi bật tắt capped phải xóa db đi, hoặc dùng query để set lại capped size
  capped: true, // có bật giới hạn không ?
  cappedMax: 10000,  // giới hạn số lượng bản ghi, đến măx nó sẽ xóa các bản ghi cũ đi 
  // cappedSize: 100000, // giới hạn size của db

  name: 'key',
  metaKey:'stack',
  decolorize: true, // xoá thuộc tính màu
  // label: 'LABEL',  // đặt label nếu muốn

  storeHost: true,  // lưu tên máy chủ hay ko
  // expireAfterSeconds: 15, // document sẽ bị tự động xóa trong bao lâu. (chỉ hoạt động khi capped : false)
}
