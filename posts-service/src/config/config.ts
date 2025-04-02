import dotenv from "dotenv";
dotenv.config();

export interface IConfig {
  jwt: string;
  rabbitmq: string;
  post_port: number;
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
  post_port: Number(process.env.POST_PORT) || 3002,
  db: {
    host: process.env.POST_DB_HOST || "localhost",
    port: Number(process.env.POST_DB_PORT) || 5432,
    username: process.env.POST_DB_USER || "post",
    password: process.env.POST_DB_PASSWORD || "password",
    database: process.env.POST_DB_NAME || "post_db",
  },
};
