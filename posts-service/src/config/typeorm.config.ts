import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config";
import { Post } from "../entities/post.entity";
import { Like } from "../entities/like.entity";

export const PostDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [Post, Like],
});
