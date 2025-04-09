import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
  } from "typeorm";
  
  @Entity("likes")
  @Unique(["postId", "ownerId"])
  export class Like {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    postId: string;
  
    @Column()
    ownerId: string;
  }
  