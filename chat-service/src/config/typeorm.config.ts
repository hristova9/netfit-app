import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config";
import { Conversation } from "../entities/conversation.entity";
import { Message } from "../entities/message.entity";

export const ChatDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [Conversation, Message],
});
