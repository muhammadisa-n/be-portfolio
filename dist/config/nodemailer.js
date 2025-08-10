"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../config/logger");
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.env.MAIL_HOST,
    port: Number(env_1.env.MAIL_PORT),
    auth: {
        user: env_1.env.MAIL_USER,
        pass: env_1.env.MAIL_PASS,
    },
    // logger: true
});
transporter.verify((error, success) => {
    if (error) {
        logger_1.logger.error("❌ Failed Connect To Nodemailer", error);
    }
    else {
        logger_1.logger.info("✅ Connected To Nodemailer", success);
    }
});
exports.default = transporter;
