"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const customFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp} ${message}`;
});
const DevLogger = () => {
    return (0, winston_1.createLogger)({
        level: 'debug',
        format: combine(timestamp({ format: 'HH:MM:A - MMM/DD/YYYY' }), customFormat),
        transports: [
            new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
            new winston_1.transports.File({ filename: 'combined.log' }),
            new winston_1.transports.Console(),
        ],
    });
};
exports.default = DevLogger;
