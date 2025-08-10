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
const web_1 = require("./config/web");
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!env_1.env.APP_SECRET ||
                env_1.env.APP_SECRET.trim() === "" ||
                !env_1.env.JWT_SECRET ||
                env_1.env.JWT_SECRET.trim() === "") {
                logger_1.logger.error("❌ APP_SECRET or JWT_SECRET is missing in your .env file.");
                logger_1.logger.error("👉 Please run `node craft key:generate` to create them.");
                process.exit(0);
            }
            yield (0, database_1.connectDatabase)();
            web_1.web.listen(env_1.env.PORT, () => {
                logger_1.logger.info(`🚀 Server is listening on: ${env_1.env.BASE_URL}`);
                logger_1.logger.info(`🔗 API Docs available at: ${env_1.env.BASE_API_URL}/docs`);
            });
        }
        catch (error) {
            process.exit(0);
        }
    });
}
startServer();
