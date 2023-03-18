import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import Todo from './Todo.entity';

@Entity()
export default class User {
  @Generated('increment')
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
}