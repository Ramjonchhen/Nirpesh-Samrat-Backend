"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
dotenv_1.default.config();
const index_1 = __importDefault(require("./routers/index"));
const server = (0, express_1.default)();
const openapiSpecification = (0, swagger_jsdoc_1.default)(swagger_1.swaggerJsDocConfig);
server.use((0, cors_1.default)());
server.use((0, helmet_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.static('public'));
server.use(express_1.default.urlencoded({ extended: true }));
server.use('/', index_1.default);
// DOCUMENTATION:Swagger
server.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification));
exports.default = server;
