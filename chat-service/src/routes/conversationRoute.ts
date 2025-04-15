import Router from "koa-router";
import {
  createNewConversation,
  getConversationWithMessages,
  getUserConversations,
} from "../services/conversation.service";
import { getUserById } from "../services/user.service";

interface ConversationRequestBody {
  user2Id: string;
}

export const conversationRouter = new Router({
  prefix: "/conversations",
});

conversationRouter.get("/", async (ctx) => {
  try {
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    const conversations = await getUserConversations(loggedInUserId);
    ctx.body = conversations;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while fetching conversations.");
    }
  }
});

conversationRouter.get("/:id", async (ctx) => {
  try {
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;
    const { id } = ctx.params;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }
    const conversationWithMessages = await getConversationWithMessages(id);
    const participantId =
      loggedInUserId === conversationWithMessages.user1Id
        ? conversationWithMessages.user2Id
        : conversationWithMessages.user1Id;

    const participant = await getUserById(participantId);
    if (
      conversationWithMessages.user1Id !== loggedInUserId &&
      conversationWithMessages.user2Id !== loggedInUserId
    ) {
      ctx.throw(403, "Forbidden: You are not part of this conversation.");
    }

    ctx.body = {
      ...conversationWithMessages,
      participant: {
        firstName: participant.firstName,
        lastName: participant.lastName,
        avatar: participant.avatar,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while fetching the conversation.");
    }
  }
});

conversationRouter.post("/", async (ctx) => {
  try {
    const loggedInUserId = ctx.headers["x-logged-in-user-id"] as string;
    console.log(loggedInUserId);
    
    const { user2Id } = ctx.request.body as ConversationRequestBody;

    if (!loggedInUserId) {
      ctx.throw(401, "Unauthorized: No user found.");
    }

    if (!user2Id || user2Id === loggedInUserId) {
      ctx.throw(400, "Invalid or self conversation.");
    }

    const conversation = await createNewConversation(loggedInUserId, user2Id);
    ctx.status = 201;
    ctx.body = conversation;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while creating the conversation.");
    }
  }
});

export default conversationRouter;
