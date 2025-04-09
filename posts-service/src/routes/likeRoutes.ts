import Router from "koa-router";
import {
  addLike,
  removeLikeByOwner,
  hasLiked,
  getLikesCount,
} from "../services/like.service";

interface LikeRequestBody {
  ownerId: string;
}

export const likeRouter = new Router({
  prefix: "/likes",
});

likeRouter.post("/:postId", async (ctx) => {
  try {
    const { postId } = ctx.params;
    // const ownerId = ctx.state.user?.id;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: ownerId not found.");
    }

    const like = await addLike(postId, loggedInUserId);
    ctx.status = 201;
    ctx.body = like;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while adding like.");
    }
  }
});

likeRouter.delete("/:postId", async (ctx) => {
  try {
    const { postId } = ctx.params;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    await removeLikeByOwner(postId, loggedInUserId);
    ctx.status = 204; 
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while removing like.");
    }
  }
});

likeRouter.get("/:postId/has-liked", async (ctx) => {
  try {
    const { postId } = ctx.params;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    const liked = await hasLiked(postId, loggedInUserId);
    ctx.body = { liked };
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while checking like status.");
    }
  }
});

likeRouter.get("/:postId/likes-count", async (ctx) => {
  try {
    const { postId } = ctx.params;
    const likesCount = await getLikesCount(postId);
    ctx.body = { likesCount };
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while retrieving likes count.");
    }
  }
});

export default likeRouter;
