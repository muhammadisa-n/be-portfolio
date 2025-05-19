import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import expressLayouts from "express-ejs-layouts";
// import path from "path";

import { errorMiddleware } from "../middleware/error-middleware";
import { httpLogger } from "../middleware/http-logger-middleware";
import { errorResponse } from "../utils/response";
import { setupSwagger } from "../utils/swagger";
import { mainRouter } from "../routes/main-route";

dotenv.config();

export const web = express();
// EJS View Engine Setup
// web.set("view engine", "ejs");
// web.set("views", path.join(__dirname, "..", "views"));
// web.use(expressLayouts);
// web.set("layout", "layouts/main");

// Middleware
web.use(express.json());
web.use(cookieParser());
web.use(cors({ credentials: true, origin: `${process.env.CLIENT_URL}` }));
web.use(express.static("public"));
web.use(httpLogger);

// Swagger Setup
setupSwagger(web);

// Routes
web.use(mainRouter);

// 404 Handler
web.use((req, res) => {
  res.status(404).json(errorResponse("Request Tidak Ada", 404));
});

// Global Error Handler
web.use(errorMiddleware);
