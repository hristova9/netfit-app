export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string | null;
    age?: number | null;
    description?: string | null;
    isAdmin: boolean;
    avatar?: string;
    cover?: string;
  }
  