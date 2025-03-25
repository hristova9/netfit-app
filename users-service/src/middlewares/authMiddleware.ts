import jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import { config } from "../config/config";
import { isTokenBlacklisted } from "../services/blacklist.service";
import { error } from "console";

export const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get("token");

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Access denied. No token provided." };
    return;
  }

  if (await isTokenBlacklisted(token)) {
    ctx.status = 401;
    ctx.body = { error: "Token is invalid or expired" };
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt);
    ctx.state.user = decoded;
    ctx.status = 200;

    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error: "Authentication failed",
      message: error instanceof Error ? error.message : "Invalid token",
    };
  }
};

export const adminMiddleware = async (ctx: Context, next: Next) => {
  if (!ctx.state.user?.isAdmin) {
    ctx.status = 403;
    ctx.body = { error: "Forbidden. Admin access required." };
    return;
  }
  await next();
};
