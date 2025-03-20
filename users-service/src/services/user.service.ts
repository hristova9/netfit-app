import * as bcryptjs from "bcryptjs";
import { IUser, IUserRegister } from "../models/user.model";
import userRepository from "../repositories/user.repository";
import _ from "lodash";

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    return await userRepository.find();
  } catch (error) {
    throw new Error("Database error: Unable to retrieve users.");
  }
};

export const getUserById = async (id: string) => {
  return userRepository.findOne({ where: { id } });
};

export const getUserByEmail = async (email?: string) => {
  return userRepository.findOne({ where: { email } });
};

export const createUser = async (data: IUserRegister): Promise<IUser> => {
  if (await userRepository.findOne({ where: { email: data.email } })) {
    throw new Error(`User with email ${data.email} already exists`);
  }

  const hashedPassword = await bcryptjs.hash(data.password, 10);
  console.log("Hashed password during registration:", hashedPassword);
  const user = userRepository.create({ ...data, password: hashedPassword });

  await userRepository.save(user);
  return user;
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  const user = await userRepository.findOne({ where: { id } });

  console.log(user);

  if (!user) {
    throw new Error(`User not found`);
  }

  const updatedUser = Object.assign(user, _.omit(data, ["id", "password"]));

  await userRepository.save(updatedUser);
  return updatedUser;
};

export const deleteUserById = async (id: string) => {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new Error(`User not found`);
  }

  await userRepository.remove(user);
};
