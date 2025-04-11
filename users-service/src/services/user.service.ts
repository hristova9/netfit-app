import * as bcryptjs from "bcryptjs";
import { IUser, IUserRegister } from "../models/user.model";
import userRepository, { findAllUsers, findUserById, findUserByEmail, saveUser, deleteUser } from "../repositories/user.repository";
import _ from "lodash";

export const getAllUsers = async () => {
  try {
    return await findAllUsers();
  } catch (error) {
    throw new Error("Database error: Unable to retrieve users.");
  }
};

export const getUserById = async (id: string) => {
  const user = await findUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");
  return user;
};

export const createUser = async (data: IUserRegister): Promise<IUser> => {
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const newUser = userRepository.create({ ...data, password: hashedPassword });
  return await saveUser(newUser);
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  const user = await getUserById(id);
  
  if (!user) {
    throw new Error(`User not found`);
  }
  const updatedUser = Object.assign(user, _.omit(data, ["id", "password"]));
  
  return await saveUser(updatedUser);
};

export const deleteUserById = async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error(`User not found`);
  }
  
  return await deleteUser(user);
};
