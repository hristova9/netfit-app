import { Message } from "./Message.model";

export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
  participant: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  messages?: Message[];
}
