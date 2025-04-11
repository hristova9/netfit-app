import { Repository } from "typeorm";
import { ChatDataSource } from "../config/typeorm.config";
import { Message } from "../entities/message.entity";

const messageRepository: Repository<Message> =
  ChatDataSource.getRepository(Message);

export const findMessagesByConversationId = async (conversationId: string) => {
  return await messageRepository.find({
    where: { conversationId },
    order: { createdAt: "ASC" },
  });
};

export const createMessage = async (message: Message) => {
  return await messageRepository.save(message);
};

export default messageRepository;
