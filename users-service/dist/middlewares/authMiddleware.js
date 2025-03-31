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
exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const blacklist_service_1 = require("../services/blacklist.service");
const authMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.cookies.get("token");
    if (!token) {
        ctx.status = 401;
        ctx.body = { error: "Access denied. No token provided." };
        return;
    }
    if (yield (0, blacklist_service_1.isTokenBlacklisted)(token)) {
        ctx.status = 401;
        ctx.body = { error: "Token is invalid or expired" };
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt);
        ctx.state.user = decoded;
        ctx.status = 200;
        yield next();
    }
    catch (error) {
        ctx.status = 401;
        ctx.body = {
            error: "Authentication failed",
            message: error instanceof Error ? error.message : "Invalid token",
        };
    }
});
exports.authMiddleware = authMiddleware;
const adminMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        ctx.status = 403;
        ctx.body = { error: "Forbidden. Admin access required." };
        return;
    }
    yield next();
});
exports.adminMiddleware = adminMiddleware;
