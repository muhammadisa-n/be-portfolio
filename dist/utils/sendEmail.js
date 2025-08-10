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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const env_1 = require("../config/env");
function sendEmail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
        <h2 style="margin-top: 0;">📬 New Contact Message</h2>
        <p><strong>Name Sender:</strong> ${data.fullName}</p>
        <p><strong>Email Sender:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `;
        yield nodemailer_1.default.sendMail({
            from: env_1.env.MAIL_FROM,
            to: "muhammadisa226@gmail.com",
            subject: "My Portfolio",
            html: html,
        });
    });
}
