"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./auth-route");
const user_route_1 = require("./user-route");
const tool_route_1 = require("./tool-route");
const project_route_1 = require("./project-route");
const message_route_1 = require("./message-route");
const file_route_1 = require("./file-route");
const public_route_1 = require("./public-route");
exports.mainRouter = express_1.default.Router();
// mainRouter.get("/", (req, res) => {
//   res.render("index", { title: "Home Page" });
// });
exports.mainRouter.get("/", (req, res) => {
    res
        .status(200)
        .json({
        app_name: process.env.APP_NAME,
        message: "Server its Running  🚀 ",
        author: "Muhammad Isa",
        status_code: 200,
    })
        .end();
});
exports.mainRouter.get("/api", (req, res) => {
    res
        .status(200)
        .json({
        app_name: process.env.APP_NAME,
        message: "Api its Running  🚀 ",
        author: "Muhammad Isa",
        status_code: 200,
    })
        .end();
});
exports.mainRouter.use(auth_route_1.authRouter);
exports.mainRouter.use(user_route_1.userRouter);
exports.mainRouter.use(tool_route_1.toolRouter);
exports.mainRouter.use(project_route_1.projectRouter);
exports.mainRouter.use(message_route_1.messageRouter);
exports.mainRouter.use(file_route_1.fileRouter);
exports.mainRouter.use(public_route_1.publicRouter);
