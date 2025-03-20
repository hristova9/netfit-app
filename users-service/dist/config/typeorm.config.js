"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.UserDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.USER_DB_HOST || "localhost",
    port: Number(process.env.USER_DB_PORT) || 5432,
    username: process.env.USER_DB_USER || "user",
    password: process.env.USER_DB_PASSWORD || "password",
    database: process.env.USER_DB_NAME || "user_db",
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User],
});
// UserDataSource.initialize()
//   .then(() => console.log("✅ User Service Database Connected"))
//   .catch((err) => console.error("❌ Error connecting to User DB", err));
