"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(status_code, message) {
        super(message);
        this.status_code = status_code;
        this.message = message;
        this.status = false;
    }
}
exports.ResponseError = ResponseError;
