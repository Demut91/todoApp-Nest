import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
// import Todo from './Todo.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Entity()
export default class User {
  @Generated('increment')
  id: number;

  @Column({
    primary: true,
  })
  name: string;

  @Column()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  // @OneToMany(() => Todo, (a) => a.author)
  // todos: Todo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken = true): object {
    const { email, token, id } = this;
    const responseObject = { user: { id, email }, token };
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
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
      { expiresIn: '7d' },
    );
  }
}
