import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import Todo from 'src/entities/Todo.entity';
import User from 'src/entities/User.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [TodoController],
  providers: [TodoService, JwtService],
  exports: [TodoService, JwtService]
})
export class TodoModule { }
