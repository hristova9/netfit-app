import Router from "koa-router";
import {
  addComment,
  getCommentsCount,
  getAllComments,
  removeCommentById,
} from "../services/comment.service";

interface CommentRequestBody {
  text: string;
}

export const commentRouter = new Router({
  prefix: "/comments",
});

commentRouter.get("/:postId", async (ctx) => {
  try {
    const { postId } = ctx.params;
    const comments = await getAllComments(postId);
    ctx.body = comments;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while fetching comments.");
    }
  }
});

commentRouter.post("/:postId", async (ctx) => {
  try {
    const { postId } = ctx.params;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;
    const { text } = ctx.request.body as CommentRequestBody;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    if (!text || typeof text !== "string") {
      ctx.throw(400, "Invalid comment text.");
    }

    const comment = await addComment(postId, loggedInUserId, text);
    ctx.status = 201;
    ctx.body = comment;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while adding the comment.");
    }
  }
});

commentRouter.delete("/:commentId", async (ctx) => {
  try {
    const { commentId } = ctx.params;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    await removeCommentById(commentId, loggedInUserId);
    ctx.status = 204;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while removing the comment.");
    }
  }
});

commentRouter.get("/:postId/comments-count", async (ctx) => {
  try {
    const { postId } = ctx.params;
    const commentsCount = await getCommentsCount(postId);
    ctx.body = { commentsCount };
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while retrieving comments count.");
    }
  }
});

export default commentRouter;
