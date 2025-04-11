import dotenv from "dotenv";
dotenv.config();

export interface IConfig {
  jwt: string;
  rabbitmq: string;
  port: number;
  usersServiceUrl: string;
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
  port: Number(process.env.CHAT_SERVICE_PORT) || 3003,
  usersServiceUrl: `http://user-service:${process.env.USER_PORT || 3001}`,
  db: {
    host: process.env.CHAT_DB_HOST || "localhost",
    port: Number(process.env.CHAT_DB_PORT) || 5432,
    username: process.env.CHAT_DB_USER || "chat",
    password: process.env.CHAT_DB_PASS || "password",
    database: process.env.CHAT_DB_NAME || "chat_db",
  },
};
