import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import expressLayouts from "express-ejs-layouts";
// import path from "path";

import { errorMiddleware } from "../middleware/error-middleware";
import { httpLogger } from "../middleware/http-logger-middleware";
import { errorResponse } from "../utils/response";
import { setupSwagger } from "./swagger";
import { mainRouter } from "../routes/main-route";
import fileUpload from "express-fileupload";
import { env } from "./env";

export const web = express();
// EJS View Engine Setup
// web.set("view engine", "ejs");
// web.set("views", path.join(__dirname, "..", "views"));
// web.use(expressLayouts);
// web.set("layout", "layouts/main");

// Middleware
web.use(express.json());
web.use(cookieParser());
web.use(
  cors({
    origin: env.CLIENT_URLS,
    credentials: true,
  })
);
web.use(fileUpload({ useTempFiles: true, tempFileDir: "./temp/" }));
web.use("/be-portfolio", express.static("public"));
web.use(httpLogger);

// Swagger Setup
setupSwagger(web);

// Routes
web.use("/be-portfolio", mainRouter);

// 404 Handler
web.use((req, res) => {
  res.status(404).json(errorResponse("Request Tidak Ada", 404));
});

// Global Error Handler
web.use(errorMiddleware);
