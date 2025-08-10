"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_themes_1 = require("swagger-themes");
const env_1 = require("../config/env");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: `${env_1.env.APP_NAME} Api Documentation`,
            version: "1.0.0",
        },
        servers: [
            {
                url: `${env_1.env.BASE_URL}`,
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                        },
                        fullName: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                            format: "email",
                        },
                        password: {
                            type: "string",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                        },
                        updated_at: {
                            type: "string",
                            format: "date-time",
                        },
                        deleted_at: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                    required: ["fullName", "email", "password"],
                },
            },
            responses: {
                UnauthorizedATError: {
                    description: "Unauthorized – token tidak valid atau tidak ada",
                    content: {
                        "application/json": {
                            example: {
                                status: false,
                                status_code: 401,
                                message: "Unauthorized: Access Token Tidak Valid.",
                            },
                        },
                    },
                },
                UnauthorizedNotLoginError: {
                    description: "Unauthorized - Belum Login.",
                    content: {
                        "application/json": {
                            example: {
                                status: false,
                                status_code: 401,
                                message: "Unauthorized: Anda Belum Login.",
                            },
                        },
                    },
                },
                ValidationError: {
                    description: "Validation Error",
                    content: {
                        "application/json": {
                            example: {
                                status: false,
                                status_code: 400,
                                message: "Validation Error",
                                errors: {
                                    field: "string",
                                    message: "string",
                                },
                            },
                        },
                    },
                },
                NotFoundError: {
                    description: "Data tidak ditemukan",
                    content: {
                        "application/json": {
                            example: {
                                status: false,
                                status_code: 404,
                                message: "Data Tidak Ditemukan",
                            },
                        },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    // apis: ["./src/route/**/*.ts"],
    apis: ["./src/apidocs/**/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const theme = new swagger_themes_1.SwaggerTheme();
const themeCss = theme.getBuffer("dark-monokai");
function setupSwagger(app) {
    app.use("/be-gateone/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        customCss: themeCss,
        customSiteTitle: `${env_1.env.APP_NAME}  Api Documentation`,
    }));
}
