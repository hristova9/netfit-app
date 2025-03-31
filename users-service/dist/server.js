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
const typeorm_config_1 = require("./config/typeorm.config");
// import { connectRabbitMQ } from "./services/rabbitmq";
const userRoutes_1 = require("./routes/userRoutes");
const cors_1 = __importDefault(require("@koa/cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const init_service_1 = require("./services/init.service");
const config_1 = require("./config/config");
const app = new koa_1.default();
const router = new koa_router_1.default();
const PORT = config_1.config.user_port;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
// app.use(uploadImage.any());
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes()).use(router.allowedMethods());
app.use(userRoutes_1.userRouter.routes()).use(userRoutes_1.userRouter.allowedMethods());
app.use(authRoutes_1.default.routes()).use(authRoutes_1.default.allowedMethods());
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_config_1.UserDataSource.initialize()
            .then(() => console.log("✅ User Service Database Connected"))
            .catch((err) => console.error("❌ Error connecting to User DB", err));
        yield (0, init_service_1.initSetup)();
        // await connectRabbitMQ();
        app.listen(PORT, "0.0.0.0", () => console.log(`User Service running on port ${PORT}`));
    }
    catch (err) {
        console.error("❌ Error during server startup", err);
    }
});
startServer();
