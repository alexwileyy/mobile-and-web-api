const winston = require('winston');

function setupLogger(){

}

exports.addLogger = (req, res, next) => {

    const log = winston.createLogger({
        format: winston.format.json(),
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log`
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: './logs/debug.log', level: 'debug' }),
            new winston.transports.File({ filename: './logs/combined.log' })
        ]
    });

    res.logger = log;
    next();
};

module.exports = exports;