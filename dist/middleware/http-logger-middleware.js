"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const logger_1 = require("../config/logger");
const httpLogger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = process.hrtime();
    res.on("finish", () => {
        const diff = process.hrtime(start);
        const timeInMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3);
        const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} ${timeInMs} ms - ${res.get("Content-Length") || 0}`;
        if (res.statusCode >= 200 && res.statusCode < 300) {
            logger_1.httpAccessLogger.info(logMessage);
        }
        else if (res.statusCode >= 300 && res.statusCode < 400) {
            logger_1.httpAccessLogger.info(logMessage);
        }
        else if (res.statusCode >= 400 && res.statusCode < 500) {
            logger_1.httpAccessLogger.warn(logMessage);
        }
        else if (res.statusCode >= 500) {
            logger_1.httpAccessLogger.error(logMessage);
        }
        else {
            logger_1.httpAccessLogger.debug(logMessage);
        }
    });
    next();
});
exports.httpLogger = httpLogger;
