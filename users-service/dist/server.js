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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
// import amqp from "amqplib"; // RabbitMQ library
const user_entity_1 = require("./entities/user.entity");
const typeorm_config_1 = require("./config/typeorm.config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRoutes_1 = require("./routes/userRoutes");
const cors_1 = __importDefault(require("@koa/cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// import dotenv from "dotenv";
// import path from "path";
const app = new koa_1.default();
const router = new koa_router_1.default();
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const PORT = process.env.USER_PORT || 3001;
app.use((0, cors_1.default)({
    origin: "http://localhost:5174",
    credentials: true
}));
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes()).use(router.allowedMethods());
app.use(userRoutes_1.userRouter.routes()).use(userRoutes_1.userRouter.allowedMethods());
app.use(authRoutes_1.default.routes()).use(authRoutes_1.default.allowedMethods());
app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'Hello World';
}));
const createAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_config_1.UserDataSource.getRepository(user_entity_1.User);
    const adminUser = yield userRepository.findOneBy({ firstName: "Admin" });
    if (!adminUser) {
        const admin = new user_entity_1.User();
        admin.firstName = "Admin";
        admin.email = "admin@example.com";
        admin.password = yield bcryptjs_1.default.hash("adminpassword", 10);
        admin.lastName = "User";
        admin.isAdmin = true;
        yield userRepository.save(admin);
        console.log("✅ Default Admin user created!");
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize the database connection
        yield typeorm_config_1.UserDataSource.initialize()
            .then(() => console.log("✅ User Service Database Connected"))
            .catch((err) => console.error("❌ Error connecting to User DB", err));
        console.log("Connected to User DB");
        // Create Admin User if not exists
        yield createAdminUser();
        // Connect to RabbitMQ
        // await connectRabbitMQ();
        console.log("✅ Connected to RabbitMQ");
        // Start the server
        app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
    }
    catch (err) {
        console.error("❌ Error during server startup", err);
    }
});
startServer();
