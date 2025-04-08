export interface Post {
  id: string;
  description: string;
  photo?: string | null;
  createdAt: Date | string;
  ownerId: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerAvatar?: string;
}
