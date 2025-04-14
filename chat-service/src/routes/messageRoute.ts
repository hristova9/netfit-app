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

export default messageRouter;
