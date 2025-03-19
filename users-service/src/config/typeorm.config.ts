import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

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

UserDataSource.initialize()
  .then(() => console.log("✅ User Service Database Connected"))
  .catch((err) => console.error("❌ Error connecting to User DB", err));
