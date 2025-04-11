import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from "typeorm";

@Entity("conversations")
@Unique(["user1Id", "user2Id"])
export class Conversation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user1Id: string;

  @Column()
  user2Id: string;

  @CreateDateColumn()
  createdAt: Date;
}
