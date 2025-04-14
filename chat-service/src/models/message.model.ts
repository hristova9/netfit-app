export interface IMessage {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: Date | string;
}

export interface MessageRepository {
  findAllByConversationId: (conversationId: string) => Promise<IMessage[]>;
  create: (data: IMessage) => Promise<IMessage>;
}
