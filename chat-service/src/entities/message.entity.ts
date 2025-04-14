import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  conversationId: string;

  @Column()
  senderId: string;

  @Column()
  recipientId: string;

  @Column("text")
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
