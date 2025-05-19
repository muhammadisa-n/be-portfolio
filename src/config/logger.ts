import winston from "winston";
import chalk from "chalk";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  const formattedMessage =
    typeof message === "object" ? JSON.stringify(message, null, 2) : message;

  let coloredLevel = level.toUpperCase();

  switch (level) {
    case "error":
      coloredLevel = chalk.redBright.bold(level.toUpperCase());
      break;
    case "warn":
      coloredLevel = chalk.yellowBright.bold(level.toUpperCase());
      break;
    case "info":
      coloredLevel = chalk.greenBright.bold(level.toUpperCase());
      break;
    case "debug":
      coloredLevel = chalk.bgBlueBright.bold(level.toUpperCase());
      break;
    default:
      coloredLevel = chalk.bgBlueBright.bold(level.toUpperCase());
      break;
  }

  return `[${chalk.gray(timestamp)}] ${coloredLevel} - ${formattedMessage}`;
});

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
  transports: [new winston.transports.Console()],
});

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const dbLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, "database-log-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "30d",
      maxSize: "10m",
    }),
  ],
});

// Format untuk FILE logs — tanpa warna
const plainFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Format untuk CONSOLE logs — dengan warna
const coloredHttpFormat = winston.format.printf(
  ({ timestamp, level, message }) => {
    let coloredLevel = level.toUpperCase();
    switch (level) {
      case "error":
        coloredLevel = chalk.red.bold(level.toUpperCase());
        break;
      case "warn":
        coloredLevel = chalk.yellow.bold(level.toUpperCase());
        break;
      case "info":
        coloredLevel = chalk.blue.bold(level.toUpperCase());
        break;
      default:
        coloredLevel = chalk.white(level.toUpperCase());
        break;
    }
    return `[${chalk.gray(timestamp)}] ${coloredLevel}: ${message}`;
  }
);

export const httpAccessLogger = winston.createLogger({
  level: "debug",
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, "access-log-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "30d",
      maxSize: "10m",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        plainFormat
      ),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        coloredHttpFormat
      ),
    }),
  ],
});
