import Router from "koa-router";
import { sendMessage, getMessagesForConversation } from "../services/message.service";

interface MessageRequestBody {
  text: string;
}

export const messageRouter = new Router({
  prefix: "/messages",
});

messageRouter.get("/:conversationId", async (ctx) => {
  try {
    const { conversationId } = ctx.params;
    const messages = await getMessagesForConversation(conversationId);
    ctx.body = messages;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while fetching messages.");
    }
  }
});

messageRouter.post("/:conversationId", async (ctx) => {
  try {
    const { conversationId } = ctx.params;
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;
    const { text } = ctx.request.body as MessageRequestBody;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    if (!text || typeof text !== "string") {
      ctx.throw(400, "Invalid message text.");
    }

    const message = await sendMessage(conversationId, loggedInUserId, text);
    ctx.status = 201;
    ctx.body = message;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while sending the message.");
    }
  }
});

export default messageRouter;
