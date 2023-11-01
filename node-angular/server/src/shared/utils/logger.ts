import { Request } from "express";
import { createLogger, transports, format } from "winston";

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
  })
);

const log = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: ".log", level: "error" }),
  ],
});

function logRequestError(request: Request, error: Error) {
  log.error(
    `${request.method}||${request.originalUrl}===========>${error.message}`
  );
}

export default { log, logRequestError };
