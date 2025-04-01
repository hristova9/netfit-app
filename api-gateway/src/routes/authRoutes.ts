import Router from "koa-router";
import forwardRequest from "./shared/forwardRequestFunc";
import { config } from "../config/config";
import authMiddleware from "../middlewares/authMiddleware";
import blacklistService from "../services/blacklist.service";
import handleError from "../utils/handleError";

const authRoutes = new Router();

authRoutes.post("/auth/register", async (ctx) => {
  try {
    const body = ctx.request.body;
    if (!body) {
      ctx.status = 400;
      ctx.body = { message: "Payload not provided!" };
      return;
    }
    const response = await forwardRequest(
      `${config.usersServiceUrl}/auth/register`,
      "POST",
      ctx,
      body
    );
    ctx.status = 201;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});

authRoutes.post("/auth/login", async (ctx) => {
  try {
    const body = ctx.request.body;
    if (!body) {
      ctx.status = 400;
      ctx.body = { message: "Payload not provided!" };
      return;
    }
    const response = await forwardRequest(
      `${config.usersServiceUrl}/auth/login`,
      "POST",
      ctx,
      body
    );
    ctx.status = 201;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});

authRoutes.post("/auth/logout", async (ctx) => {
  const token = ctx.cookies.get("token");
  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/auth/logout`,
      "POST",
      ctx,
      {}
    );
    ctx.status = 200;
    ctx.body = await response;
    if (response.status === 204 && token) {
      const expiresIn = 3600;
      await blacklistService.addToBlacklist(token, expiresIn);
    }
  } catch (error) {
    handleError(ctx, error);
  }
});

authRoutes.get("/auth/validate-token", authMiddleware, async (ctx) => {
  if (ctx.status === 401) {
    ctx.body = { message: "Unauthorized" };
    return false;
  }
  ctx.body = { message: "Token is valid" };
  return true;
});

authRoutes.get("/users", async (ctx) => {
  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users`,
      "GET",
      ctx,
      undefined
    );

    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});

export default authRoutes;
