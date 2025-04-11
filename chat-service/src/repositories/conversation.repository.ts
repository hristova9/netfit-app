import { Repository } from "typeorm";
import { ChatDataSource } from "../config/typeorm.config";
import { Conversation } from "../entities/conversation.entity";

const conversationRepository: Repository<Conversation> =
  ChatDataSource.getRepository(Conversation);

export const findConversationByUsers = async (user1: string, user2: string) => {
  return await conversationRepository.findOne({
    where: [
      { user1Id: user1, user2Id: user2 },
      { user1Id: user2, user2Id: user1 },
    ],
  });
};

export const findConversationsByUserId = async (userId: string) => {
  return await conversationRepository.find({
    where: [{ user1Id: userId }, { user2Id: userId }],
    order: { createdAt: "DESC" },
  });
};

export const createConversation = async (conversation: Conversation) => {
  return await conversationRepository.save(conversation);
};

export default conversationRepository;
