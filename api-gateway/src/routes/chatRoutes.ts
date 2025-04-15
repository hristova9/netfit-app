import Router from "koa-router";
import { config } from "../config/config";
import authMiddleware from "../middlewares/authMiddleware";
import forwardRequest from "./shared/forwardRequestFunc";
import handleError from "../utils/handleError";

const chatRoutes = new Router();

interface SecondUser {
  user2Id: string;
}

chatRoutes.get("/conversations", authMiddleware, async (ctx) => {
  try {
    const loggedInUser = ctx.state.user?.id;

    if (!loggedInUser) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    const response = await forwardRequest(
      `${config.chatServiceUrl}/conversations`,
      "GET",
      ctx
    );
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});

chatRoutes.get(
  "/conversations/:conversationId",
  authMiddleware,
  async (ctx) => {
    const { conversationId } = ctx.params;

    try {
      const loggedInUser = ctx.state.user?.id;

      if (!loggedInUser) {
        ctx.throw(401, "Unauthorized: No user found.");
      }

      const response = await forwardRequest(
        `${config.chatServiceUrl}/conversations/${conversationId}`,
        "GET",
        ctx
      );

      ctx.status = 200;
      ctx.body = response;
    } catch (error) {
      handleError(ctx, error);
    }
  }
);

// chatRoutes.get(
//   "/conversations/:conversationId/messages",
//   authMiddleware,
//   async (ctx) => {
//     const { conversationId } = ctx.params;

//     try {
//       const loggedInUser = ctx.state.user?.id;

//       if (!loggedInUser) {
//         ctx.throw(401, "Unauthorized: No user found.");
//       }

//       const response = await forwardRequest(
//         `${config.chatServiceUrl}/conversations/${conversationId}/messages`,
//         "GET",
//         ctx
//       );
//       ctx.status = 200;
//       ctx.body = response;
//     } catch (error) {
//       handleError(ctx, error);
//     }
//   }
// );

chatRoutes.post("/messages/:conversationId", authMiddleware, async (ctx) => {
  const { conversationId } = ctx.params;
  const { text } = ctx.request.body as { text: string };
  const user = ctx.state.user;

  if (!text) {
    ctx.status = 400;
    ctx.body = { message: "Message text is required" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.chatServiceUrl}/messages/${conversationId}`,
      "POST",
      ctx,
      { text, senderId: user.id }
    );
    ctx.status = 201;
    ctx.body = { message: "Message sent", data: response };
  } catch (error) {
    handleError(ctx, error);
  }
});

chatRoutes.post("/conversations", authMiddleware, async (ctx) => {
  const { user2Id } = ctx.request.body as SecondUser;
  const user = ctx.state.user;
  console.log(user, user.id);
  

  if (!user2Id) {
    ctx.status = 400;
    ctx.body = { message: "User ID for conversation is required" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.chatServiceUrl}/conversations`,
      "POST",
      ctx,
      {user2Id: user2Id }
    );
    ctx.status = 201;
    ctx.body = { message: "Conversation created", data: response };
  } catch (error) {
    handleError(ctx, error);
  }
});

export default chatRoutes;
