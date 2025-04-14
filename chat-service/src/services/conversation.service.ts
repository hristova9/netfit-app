import { Conversation } from "../entities/conversation.entity";
import { IUser } from "../models/user.model";
import conversationRepository, {
  createConversation,
  findConversationsByUserId,
  findConversationByUsers,
  getConversationById,
} from "../repositories/conversation.repository";
import { getMessagesForConversation } from "./message.service";
import { getUsersByIds } from "./user.service";

export const getUserConversations = async (
  userId: string
): Promise<(Conversation & { participant: Partial<IUser> })[]> => {
  const conversations = await findConversationsByUserId(userId);

  const participantIds = conversations.map((c) =>
    c.user1Id === userId ? c.user2Id : c.user1Id
  );

  const users = (await getUsersByIds(participantIds)) as IUser[];
  const userMap = new Map(users.map((u) => [u.id, u]));

  return conversations.map((conversation) => {
    const otherUserId = conversation.user1Id === userId ? conversation.user2Id : conversation.user1Id;
    const participant = userMap.get(otherUserId);

    return {
      ...conversation,
      participant: {
        firstName: participant?.firstName,
        lastName: participant?.lastName,
        avatar: participant?.avatar || undefined,
      },
    };
  });
};

export const getConversationWithMessages = async (conversationId: string) => {
    const conversation = await getConversationById(conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // const participant = conversation.user1Id === 
  
    const messages = await getMessagesForConversation(conversationId);
    return {
      ...conversation,
      messages: messages,
    };
  };

export const createNewConversation = async (
  user1Id: string,
  user2Id: string
): Promise<Conversation> => {
  if (user1Id === user2Id) throw new Error("Cannot create conversation with self");

  const existing = await findConversationByUsers(user1Id, user2Id);
  if (existing) return existing;

  const newConversation = conversationRepository.create({ user1Id, user2Id });
  return await createConversation(newConversation);
};
