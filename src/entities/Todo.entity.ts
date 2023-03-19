// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   Generated,
//   ManyToOne,
//   UpdateDateColumn,
// } from 'typeorm';
// import User from './User.entity';

// @Entity()
// export default class Todo {
//   @Generated('increment')
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   description: string;

//   @Column()
//   isCompleted: boolean;

//   @ManyToOne(() => User, (u) => u.todos)
//   author: User;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
