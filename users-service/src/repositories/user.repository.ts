import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDataSource } from "../config/typeorm.config";
import bcrypt from "bcryptjs";
import { IUser, IUserRegister } from "../models/user.model";

const userRepository: Repository<User> = UserDataSource.getRepository(User);

export const findAllUsers = async () => await userRepository.find();
export const findUserById = async (id: string) => await userRepository.findOne({ where: { id } });
export const findUserByEmail = async (email: string) => await userRepository.findOne({ where: { email } });
export const saveUser = async (user: User) => await userRepository.save(user);
export const deleteUser = async (user: User) => await userRepository.remove(user);

export default userRepository;
