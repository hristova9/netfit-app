import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";
export const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
export const USER_PORT = process.env.USER_PORT || "3001";