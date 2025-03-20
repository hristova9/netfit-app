// import jwt from "jsonwebtoken";
import { Context, Next } from "koa";
// import { JWT_SECRET } from "../config/config";
// import { IJwtUser, IUser } from "../models/user.model";
// import { isTokenBlacklisted } from "../services/blacklist.service";

// export const authMiddleware = async (ctx: Context, next: Next) => {
//   const token = ctx.headers.authorization?.split(" ")[1];

//   if (!token) {
//     ctx.status = 401;
//     ctx.body = { error: "Access denied. No token provided." };
//     return;
//   }

//   if (await isTokenBlacklisted(token)) {
//     ctx.status = 401;
//     ctx.body = { error: "Token is invalid or expired" };
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as IJwtUser;
//     ctx.state.user = decoded;
//     await next();
//   } catch (error) {
//     ctx.status = 401;
//     ctx.body = { error: "Invalid or expired token." };
//   }
// };

export const adminMiddleware = async (ctx: Context, next: Next) => {
  if (!ctx.state.user?.isAdmin) {
    ctx.status = 403;
    ctx.body = { error: "Forbidden. Admin access required." };
    return;
  }
  await next();
};
