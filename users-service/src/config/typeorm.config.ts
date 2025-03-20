import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import dotenv from "dotenv";

dotenv.config();

export const UserDataSource = new DataSource({
  type: "postgres",
  host: process.env.USER_DB_HOST || "localhost",
  port: Number(process.env.USER_DB_PORT) || 5432,
  username: process.env.USER_DB_USER || "user",
  password: process.env.USER_DB_PASSWORD || "password",
  database: process.env.USER_DB_NAME || "user_db",
  synchronize: true,
  logging: false,
  entities: [User],
});
