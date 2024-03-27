import { createLogger, transports, format } from "winston";

//define logger
const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.simple()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
    ],
});

export default logger;
