import Router from "koa-router";
import { config } from "../config/config";
import authMiddleware from "../middlewares/authMiddleware";
import forwardRequest from "./shared/forwardRequestFunc";
import handleError from "../utils/handleError";

const postRoutes = new Router();

// Get all posts
postRoutes.get("/posts", async (ctx) => {
  try {
    const response = await forwardRequest(
      `${config.postsServiceUrl}/posts`,
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

// Get a single post by ID
postRoutes.get("/posts/:id", async (ctx) => {
  const { id } = ctx.params;

  try {
    const response = await forwardRequest(
      `${config.postsServiceUrl}/posts/${id}`,
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

// Create a new post
postRoutes.post("/posts", authMiddleware, async (ctx) => {
  const user = ctx.state.user;
  const body = ctx.request.body;

  if (!body) {
    ctx.status = 400;
    ctx.body = { message: "Content is required to create a post!" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.postsServiceUrl}/posts`,
      "POST",
      ctx,
      { ...body, userId: user.id }
    );
    ctx.status = 201;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});

// Update a post
postRoutes.put("/posts/:id", authMiddleware, async (ctx) => {
  const { id } = ctx.params;
  const user = ctx.state.user;
  const body = ctx.request.body;

  if (!body) {
    ctx.status = 400;
    ctx.body = { message: "Payload not provided!" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.postsServiceUrl}/posts/${id}`,
      "PUT",
      ctx,
      body
    );
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});

// Delete a post
postRoutes.delete("/posts/:id", authMiddleware, async (ctx) => {
  const { id } = ctx.params;
  const user = ctx.state.user;

  try {
    const response = await forwardRequest(
      `${config.postsServiceUrl}/posts/${id}`,
      "DELETE",
      ctx,
      undefined
    );

    if (response?.status === 204) {
      ctx.status = 204;
      ctx.body = { message: "Post deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Failed to delete post" };
    }
  } catch (error) {
    handleError(ctx, error);
  }
});

export default postRoutes;
