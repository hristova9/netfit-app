import Router from "koa-router";
import { config } from "../config/config";
import authMiddleware from "../middlewares/authMiddleware";
import forwardRequest from "./shared/forwardRequestFunc";
import handleError from "../utils/handleError";

const userRoutes = new Router();

userRoutes.get("/users/me", authMiddleware, async (ctx) => {
  const user = ctx.state.user;

  if (!user.id) {
    ctx.status = 400;
    ctx.body = { error: "User ID not found in token" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${user.id}`,
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

userRoutes.put("/users/:id", authMiddleware, async (ctx) => {
  const { id } = ctx.params;
  const body = ctx.request.body;

  if (!body) {
    ctx.status = 400;
    ctx.body = { message: "Payload not provided!" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${id}`,
      "PUT",
      ctx,
      body
    );
    ctx.status = 200;
    ctx.body = await response;
  } catch (error) {
    handleError(ctx, error);
  }
});

userRoutes.delete("/users/:id", async (ctx) => {
  const { id } = ctx.params;
  try {
    console.log("Deleting user with ID:", id);
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${id}`,
      "DELETE",
      ctx,
      undefined
    );

    if (response?.status === 204) {
      ctx.status = 204;
      ctx.body = { message: "User deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Failed to delete user" };
    }
  } catch (error) {
    handleError(ctx, error);
  }
});

export default userRoutes;
