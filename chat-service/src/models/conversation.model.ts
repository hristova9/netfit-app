export interface IConversation {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date | string;
}

export interface ConversationRepository {
  findAllByUserId: (userId: string) => Promise<IConversation[]>;
  findByUsers: (
    user1Id: string,
    user2Id: string
  ) => Promise<IConversation | null>;
  create: (data: IConversation) => Promise<IConversation>;
}
