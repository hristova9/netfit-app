export interface Post {
  id: string;
  description: string;
  photo?: string | null;
  createdAt: Date | string;
  ownerId: string;
  owner?: {
      firstName: string;
      lastName: string;
      avatar?: string;
  }
  likesCount?: number;
  hasLiked?: boolean;
}
