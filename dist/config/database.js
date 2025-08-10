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
exports.connectDatabase = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const luxon_1 = require("luxon");
const logger_2 = require("./logger");
const env_1 = require("./env");
exports.prismaClient = new client_1.PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        },
        {
            emit: "event",
            level: "info",
        },
        {
            emit: "event",
            level: "warn",
        },
    ],
});
exports.prismaClient.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield next(params);
    const convertToYourTimeZone = (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return "";
        }
        return luxon_1.DateTime.fromJSDate(date)
            .setZone(env_1.env.TZ || "UTC")
            .toFormat(env_1.env.DATETIME_FORMAT);
    };
    const transformDates = (item) => {
        if (!item)
            return item;
        if (Array.isArray(item)) {
            return item.map(transformDates);
        }
        if (typeof item === "object") {
            const newItem = Object.assign({}, item);
            for (const key in newItem) {
                const value = newItem[key];
                if (["created_at", "updated_at", "deleted_at"].includes(key) &&
                    value instanceof Date) {
                    newItem[key] = convertToYourTimeZone(value);
                }
                else if (typeof value === "object" && value !== null) {
                    newItem[key] = transformDates(value);
                }
            }
            return newItem;
        }
        return item;
    };
    return transformDates(result);
}));
exports.prismaClient.$on("query", (e) => {
    logger_2.dbLogger.info(`${e.query} - ${e.params}`);
});
exports.prismaClient.$on("warn", (e) => {
    logger_1.logger.warn(e);
});
exports.prismaClient.$on("info", (e) => {
    logger_1.logger.info(e);
});
exports.prismaClient.$on("error", (e) => {
    logger_1.logger.error(e);
});
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.prismaClient.$connect();
        logger_1.logger.info("✅ Connected Database");
    }
    catch (error) {
        logger_1.logger.error("❌ Failed Connect To Database", error);
        throw error;
    }
});
exports.connectDatabase = connectDatabase;
