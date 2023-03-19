import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Todo from './Todo.entity';
import { IsEmail } from 'class-validator';
import { AuthResponse } from 'src/types/response';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => Todo, (a) => a.author)
  todos: Todo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 4);
  }

  getResponse(): AuthResponse {
    const { email, token, id } = this;
    return { user: { id, email }, token };
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token(): string {
    const { id, email } = this;
    return jwt.sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: process.env.JWT_EXP || '7d' },
    );
  }
}