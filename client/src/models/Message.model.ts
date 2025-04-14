export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    sender: {
        firstName: string;
        lastName: string;
        avatar: string;
    }
    text: string;
    createdAt: string;
}