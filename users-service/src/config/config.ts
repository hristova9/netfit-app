import dotenv from "dotenv";
dotenv.config();

export interface IConfig {
  jwt: string;
  rabbitmq: string;
  user_port: number;
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

export const config: IConfig = {
  jwt: process.env.JWT_SECRET || "your-super-secret-key",
  rabbitmq: process.env.RABBITMQ_URL || "amqp://localhost",
  user_port: Number(process.env.USER_PORT) || 3001,
  db: {
    host: process.env.USER_DB_HOST || "localhost",
    port: Number(process.env.USER_DB_PORT) || 5432,
    username: process.env.USER_DB_USER || "user",
    password: process.env.USER_DB_PASSWORD || "password",
    database: process.env.USER_DB_NAME || "user_db",
  },
};
