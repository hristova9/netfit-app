import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { config } from '../config/config';
import blacklistService  from '../services/blacklist.service';
import handleError from '../utils/handleError';

const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('token');

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Access denied. No token provided.' };
    console.log("no token");
    
    return;
  }

  if (await blacklistService.isTokenBlacklisted(token)) {
    ctx.status = 401;
    ctx.body = { error: 'Token is blacklisted, possibly invalid or expired' };
    console.log("blacklisted");
    
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt);
    ctx.state.user = decoded;

    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      ctx.status = 401;
      ctx.body = { error: "Token has expired, please login again." };
    } else if (error instanceof jwt.JsonWebTokenError) {
      ctx.status = 401;
      ctx.body = { error: "Invalid token, authentication failed." };
    } else {
      handleError(ctx, error);
    }
  }
};

export default authMiddleware;