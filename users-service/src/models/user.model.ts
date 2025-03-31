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

export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IJwtUser extends IUser {
  iat: number;
  exp: number;
}

export interface UserRepository {
  find: () => Promise<IUser[]>;
  findById: (id: string) => Promise<IUser | void>;
  findByEmail: (email: string) => Promise<IUser | void>;
  create: (data: IUserRegister) => Promise<IUserRegister>;
  update: (data: IUser) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
