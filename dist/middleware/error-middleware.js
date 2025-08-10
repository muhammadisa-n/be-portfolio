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
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const response_error_1 = require("../utils/response-error");
const errorMiddleware = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof zod_1.ZodError) {
        let formattedErrors = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));
        res
            .status(400)
            .json((0, response_1.errorResponse)("Validation Error", 400, formattedErrors));
    }
    else if (error instanceof response_error_1.ResponseError) {
        res
            .status(error.status_code)
            .json((0, response_1.errorResponse)(error.message, error.status_code));
    }
    else {
        res.status(500).json((0, response_1.errorResponse)(error.message, 500));
    }
});
exports.errorMiddleware = errorMiddleware;
