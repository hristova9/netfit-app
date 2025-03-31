"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    jwt: process.env.JWT_SECRET || "your-super-secret-key",
    rabbitmq: process.env.RABBITMQ_URL || "amqp://localhost",
    user_port: Number(process.env.USER_PORT) || 3001,
    db: {
        host: process.env.USER_DB_HOST || "localhost",
        port: Number(process.env.USER_DB_PORT) || 5432,
        username: process.env.USER_DB_USER || "user",
        password: process.env.USER_DB_PASSWORD || "password",
        database: process.env.USER_DB_NAME || "user_db",
    },
};
