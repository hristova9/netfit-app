import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDataSource } from "../config/typeorm.config";
import bcrypt from "bcryptjs";
import { IUser, IUserRegister } from "../models/user.model";

const userRepository: Repository<IUser> = UserDataSource.getRepository(User);

export const findAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.find();
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await userRepository.findOne({ where: { id } });
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await userRepository.findOne({ where: { email } });
};

export const createUser = async (data: IUserRegister): Promise<IUser> => {
  const newUser = userRepository.create(data);
  console.log(newUser);
  
  return await userRepository.save(newUser);
};

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser> => {
  const user = await findUserById(id);
  if (!user) throw new Error("User not found");

  Object.assign(user, data);
  return await userRepository.save(user);
};

export const deleteUser = async (id: string): Promise<void> => {
  const user = await findUserById(id);
  if (!user) throw new Error("User not found");

  await userRepository.remove(user);
};

export default userRepository;
