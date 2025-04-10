import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  postId: string;

  @Column()
  ownerId: string;

  @Column("text")
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
