export interface IPost {
  id: string;
  description: string;
  photo?: string;
  createdAt: Date | string;
  ownerId: string;
}

export interface PostRepository {
  find: () => Promise<IPost[]>;
  findById: (id: string) => Promise<IPost | void>;
  create: (data: IPost) => Promise<IPost>;
  update: (id: string, data: Partial<IPost>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}


export interface ILike{
    id: string;
    postId: string;
    ownerId: string;
}