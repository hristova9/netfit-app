import Router from "koa-router";
import {
  deletePostById,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
} from "../services/post.service";
import { IPost } from "../models/post.model";

export const postRouter = new Router({
  prefix: "/posts",
});

// Get all posts
postRouter.get("/", async (ctx) => {
  try {
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }
    
    const posts = await getAllPosts(loggedInUserId);
    ctx.status = 200;
    ctx.body = posts;
  } catch (error) {
    ctx.throw(500, "An error occurred while retrieving posts.");
  }
});

// Get a single post by ID
postRouter.get("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }
    const post = await getPostById(id, loggedInUserId);
    ctx.body = post;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(500, "An error occurred while retrieving the post.");
    }
  }
});

// Create a new post
postRouter.post("/", async (ctx) => {
  try {
    const body = ctx.request.body as IPost;
    const newPost = await createPost(body);
    ctx.status = 201;
    ctx.body = newPost;
  } catch (error) {
    ctx.throw(400, "An error occurred while creating the post.");
  }
});

// Update an existing post
postRouter.put("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const body = ctx.request.body as Partial<IPost>;
    const updatedPost = await updatePost(id, body);
    ctx.body = updatedPost;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while updating the post.");
    }
  }
});

// Delete a post
postRouter.delete("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    await deletePostById(id);

    ctx.status = 204; // No content
    console.log("✅ Post deleted successfully");
  } catch (error) {
    console.error("❌ Error deleting post:", error);

    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(500, "An error occurred while deleting the post.");
    }
  }
});

export default postRouter;
