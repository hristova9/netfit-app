import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcryptjs from 'bcryptjs';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: "boolean", default: false })
  isAdmin: boolean;
  

  @BeforeInsert()
  setDefaultAdmin() {
    if (this.firstName === "Admin") {
      this.isAdmin = true;
    }
  }

  // @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  // role: "user" | "admin";
}
