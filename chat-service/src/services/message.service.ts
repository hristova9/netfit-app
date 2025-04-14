import { Message } from "../entities/message.entity";
import messageRepository, {
  createMessage,
  findMessagesByConversationId,
} from "../repositories/message.repository";
import { IUser } from "../models/user.model";
import { getUsersByIds } from "./user.service";

export const getMessagesForConversation = async (
  conversationId: string
): Promise<(Message & { sender: Partial<IUser> })[]> => {
  const messages = await findMessagesByConversationId(conversationId);
  const senderIds = [...new Set(messages.map((msg) => msg.senderId))];
  const users = (await getUsersByIds(senderIds)) as IUser[];

  const usersMap = new Map(users.map((u) => [u.id, u]));

  return messages.map((message) => {
    const sender = usersMap.get(message.senderId);

    return {
      ...message,
      sender: {
        firstName: sender?.firstName || "",
        lastName: sender?.lastName || "",
        avatar: sender?.avatar || undefined,
      },
    };
  });
};

export const sendMessage = async (
    senderId: string,
    recipientId: string,
    text: string,
    conversationId: string,
): Promise<Message> => {
  const newMessage = messageRepository.create({
      senderId,
      recipientId,
      text,
      conversationId,
  });
  console.log("in service: ", newMessage);
  

  return await createMessage(newMessage);
  
};
