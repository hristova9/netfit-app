import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  description: string;

  @Column({ nullable: true })
  photo?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  ownerId: string;

  @Column()
  ownerFirstName: string;

  @Column()
  ownerLastName: string;

  @Column({ nullable: true })
  ownerAvatar?: string;
}
