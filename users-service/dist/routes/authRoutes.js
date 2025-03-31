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
const koa_router_1 = __importDefault(require("koa-router"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const user_validation_shema_1 = require("../controllers/user.validation-shema");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const blacklist_service_1 = require("../services/blacklist.service");
const authRouter = new koa_router_1.default({
    prefix: "/auth",
});
authRouter.post("/register", (0, validatorMiddleware_1.validator)(user_validation_shema_1.createUserValidationSchema), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = ctx.request.body;
        const newUser = yield (0, user_service_1.createUser)(body);
        ctx.status = 201;
        ctx.body = {
            message: "User registered successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        };
    }
    catch (err) {
        if (err instanceof Error) {
            ctx.throw(400, err.message);
            console.error(`Error during registration: ${err.message}`);
        }
        else {
            console.error("Unexpected error occurred during registration:", err);
            ctx.throw(500, "An unexpected error occurred during registration. Please try again later.");
        }
    }
}));
authRouter.post("/login", (0, validatorMiddleware_1.validator)(user_validation_shema_1.loginUserValidationSchema), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    try {
        const isValidUser = yield (0, auth_service_1.checkUserCredentials)(body.email, body.password);
        if (!isValidUser) {
            ctx.status = 401;
            ctx.body = { message: "Invalid email or password." };
            return;
        }
        const user = yield (0, user_service_1.getUserByEmail)(body.email);
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, config_1.config.jwt, { expiresIn: "1h" });
        ctx.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        });
        ctx.status = 200;
        ctx.body = { message: "Login successful", token: token };
    }
    catch (err) {
        if (err instanceof Error) {
            ctx.throw(400, err.message);
            console.error(`Error during login: ${err.message}`);
        }
        else {
            console.error("Unexpected error occurred during login:", err);
            ctx.throw(500, "An unexpected error occurred during login. Please try again later.");
        }
    }
}));
authRouter.post("/logout", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.cookies.get("token");
    if (!token) {
        ctx.status = 400;
        ctx.body = { error: "No token provided" };
        return;
    }
    try {
        const isBlacklisted = yield (0, blacklist_service_1.isTokenBlacklisted)(token);
        if (isBlacklisted) {
            ctx.status = 400;
            ctx.body = { error: "Token is already logged out (blacklisted)" };
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
        if (expiresIn > 0) {
            console.log("Invalidating token:", token);
            yield (0, blacklist_service_1.addToBlacklist)(token, expiresIn);
        }
        ctx.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });
        ctx.status = 200;
        ctx.body = { message: "Logged out successfully" };
    }
    catch (error) {
        ctx.status = 400;
        ctx.body = { error: "Invalid token" };
    }
}));
// authRouter.get("/protected-route", async (ctx) => {
//   const token = ctx.cookies.get("token");
//   try {
//     if (!token || (await isTokenBlacklisted(token))) {
//       ctx.status = 200;
//       ctx.body = { authenticated: false };
//       return;
//     }
//     const decoded = jwt.verify(token, config.jwt);
//     ctx.state.user = decoded;
//     ctx.status = 200;
//     ctx.body = { authenticated: true };
//   } catch (error) {
//     ctx.status = 400;
//     ctx.body = { authenticated: false };
//   }
// });
exports.default = authRouter;
