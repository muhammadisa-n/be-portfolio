"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import expressLayouts from "express-ejs-layouts";
// import path from "path";
const error_middleware_1 = require("../middleware/error-middleware");
const http_logger_middleware_1 = require("../middleware/http-logger-middleware");
const response_1 = require("../utils/response");
const swagger_1 = require("./swagger");
const main_route_1 = require("../routes/main-route");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const env_1 = require("./env");
exports.web = (0, express_1.default)();
// EJS View Engine Setup
// web.set("view engine", "ejs");
// web.set("views", path.join(__dirname, "..", "views"));
// web.use(expressLayouts);
// web.set("layout", "layouts/main");
// Middleware
exports.web.use(express_1.default.json());
exports.web.use((0, cookie_parser_1.default)());
exports.web.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URLS,
    credentials: true,
}));
exports.web.use((0, express_fileupload_1.default)({ useTempFiles: true, tempFileDir: "./temp/" }));
exports.web.use(express_1.default.static("public"));
exports.web.use(http_logger_middleware_1.httpLogger);
// Swagger Setup
(0, swagger_1.setupSwagger)(exports.web);
// Routes
exports.web.use(main_route_1.mainRouter);
// 404 Handler
exports.web.use((req, res) => {
    res.status(404).json((0, response_1.errorResponse)("Request Tidak Ada", 404));
});
// Global Error Handler
exports.web.use(error_middleware_1.errorMiddleware);
