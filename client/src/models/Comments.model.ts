export interface Comment {
    id: string;
    ownerId: string;
    owner?: {
        firstName: string;
        lastName: string;
        avatar?: string;
    }
    postId: string;
    text: string;
    createdAt: Date | string;
}