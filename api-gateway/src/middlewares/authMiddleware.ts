import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { config } from '../config/config';
import blacklistService  from '../services/blacklist.service';
// import { isTokenBlacklisted } from '../services/blacklist.service';

const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('token');

  // Check if the token exists
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Access denied. No token provided.' };
    return;
  }

  // Check if the token is blacklisted
  if (await blacklistService.isTokenBlacklisted(token)) {
    ctx.status = 401;
    ctx.body = { error: 'Token is blacklisted, possibly invalid or expired' };
    return;
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, config.jwt);
    // Attach user data to ctx.state for future use
    console.log("cts.state.user1 - "  + ctx.state.user);
    ctx.state.user = decoded;
    console.log("decoded - "  + decoded);
    console.log("cts.state.user2 - "  + ctx.state.user);
    

    // Proceed to the next middleware or route handler
    await next();
  } catch (error) {
    // Handle invalid token (either expired or malformed)
    ctx.status = 401;
    ctx.body = {
      error: 'Authentication failed',
      message: error instanceof Error ? error.message : 'Invalid token',
    };
  }
};

export default authMiddleware;