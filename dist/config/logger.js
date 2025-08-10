"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAccessLogger = exports.dbLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const chalk_1 = __importDefault(require("chalk"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const customFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    const formattedMessage = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
    let coloredLevel = level.toUpperCase();
    switch (level) {
        case "error":
            coloredLevel = chalk_1.default.redBright.bold(level.toUpperCase());
            break;
        case "warn":
            coloredLevel = chalk_1.default.yellowBright.bold(level.toUpperCase());
            break;
        case "info":
            coloredLevel = chalk_1.default.greenBright.bold(level.toUpperCase());
            break;
        case "debug":
            coloredLevel = chalk_1.default.blueBright.bold(level.toUpperCase());
            break;
        default:
            coloredLevel = chalk_1.default.whiteBright.bold(level.toUpperCase());
            break;
    }
    return `[${chalk_1.default.gray(timestamp)}] ${coloredLevel} - ${formattedMessage}`;
});
exports.logger = winston_1.default.createLogger({
    level: "debug",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
    transports: [new winston_1.default.transports.Console()],
});
const logDir = path_1.default.join(__dirname, "../../logs");
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
exports.dbLogger = winston_1.default.createLogger({
    level: "debug",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(logDir, "database-log-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: false,
            maxFiles: "30d",
            maxSize: "10m",
        }),
    ],
});
// Format untuk FILE logs — tanpa warna
const plainFormat = winston_1.default.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});
const coloredHttpFormat = winston_1.default.format.printf(({ timestamp, level, message }) => {
    const msg = String(message);
    let coloredLevel = level.toUpperCase();
    switch (level) {
        case "error":
            coloredLevel = chalk_1.default.redBright.bold(level.toUpperCase());
            break;
        case "warn":
            coloredLevel = chalk_1.default.yellowBright.bold(level.toUpperCase());
            break;
        case "info":
            coloredLevel = chalk_1.default.greenBright.bold(level.toUpperCase());
            break;
        case "debug":
            coloredLevel = chalk_1.default.blueBright.bold(level.toUpperCase());
            break;
        default:
            coloredLevel = chalk_1.default.whiteBright(level.toUpperCase());
            break;
    }
    // Pewarnaan method HTTP
    const methodMatch = msg.match(/^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)/);
    const methodColors = {
        GET: chalk_1.default.green.bold("GET"),
        POST: chalk_1.default.cyan.bold("POST"),
        PUT: chalk_1.default.yellow.bold("PUT"),
        DELETE: chalk_1.default.red.bold("DELETE"),
        PATCH: chalk_1.default.magenta.bold("PATCH"),
        OPTIONS: chalk_1.default.white.bold("OPTIONS"),
        HEAD: chalk_1.default.gray.bold("HEAD"),
    };
    let coloredMessage = msg;
    if (methodMatch) {
        const method = methodMatch[0];
        coloredMessage = msg.replace(method, methodColors[method]);
    }
    return `[${chalk_1.default.gray(timestamp)}] ${coloredLevel}: ${coloredMessage}`;
});
exports.httpAccessLogger = winston_1.default.createLogger({
    level: "debug",
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(logDir, "access-log-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: false,
            maxFiles: "30d",
            maxSize: "10m",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), plainFormat),
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), coloredHttpFormat),
        }),
    ],
});
