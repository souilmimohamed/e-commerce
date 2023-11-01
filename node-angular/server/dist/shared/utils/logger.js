"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const customFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
}));
const log = (0, winston_1.createLogger)({
    format: customFormat,
    transports: [
        new winston_1.transports.Console({ level: "info" }),
        new winston_1.transports.File({ filename: ".log", level: "error" }),
    ],
});
function logRequestError(request, error) {
    log.error(`${request.method}||${request.originalUrl}===========>${error.message}`);
}
exports.default = { log, logRequestError };
