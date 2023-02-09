const winston = require('winston')

// const options = {
//     file: {
//         level: 'info',
//         filename: './logs/app.log',
//         handleExceptions: true,
//         json: true,
//         maxsize: 5242880,
//         maxFiles: 5,
//         colorize: false,
//     },
//     console: {
//         level: 'debug',
//         handleExceptions: true,
//         json: false,
//         colorize: true,
//     }
// }

// const logger = winston.createLogger({
//     levels: winston.config.npm.levels,
//     transports: [
//         new winston.transports.File(options.file),
//         new winston.transports.Console(options.console)
//     ],
//     exitOnError: false
// })

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

module.exports = logger