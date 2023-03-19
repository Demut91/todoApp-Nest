import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Todo from 'src/entities/Todo.entity';
import { TodoDto, TodoEditDto } from 'src/dto/todo.dto';
import User from 'src/entities/User.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createTask(userId: number, todo: TodoDto): Promise<void> {
    try {
      const author = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!author) {
        throw new ForbiddenException('Access denied');
      }
      const existed = await this.todoRepository.findOne({
        where: { title: todo.title },
      });
      if (existed) {
        throw new ConflictException('Task with this title already exist!');
      }
      const newTask = this.todoRepository.create({
        ...todo,
        author,
        isCompleted: false,
      });
      await this.todoRepository.save(newTask);
    } catch (error) {
      throw error;
    }
  }

  async getMyTodoTasks(id: number): Promise<Todo[]> {
    try {
      const todos = await this.todoRepository
        .createQueryBuilder('todos')
        .where('todos.author = :id', { id })
        .orderBy('todos.createdAt', 'DESC')
        .getMany();
      return todos;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(
    userId: number,
    id: number,
    data: TodoEditDto,
  ): Promise<void> {
    try {
      const todo = await this.todoRepository
        .createQueryBuilder('todo')
        .where({ id })
        .leftJoinAndSelect('todo.author', 'user')
        .getOne();
      if (todo.author.id === userId) await this.todoRepository.update(id, data);
      else throw new ForbiddenException('Access denied');
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(userId: number, id: number): Promise<void> {
    try {
      const todo = await this.todoRepository
        .createQueryBuilder('todo')
        .where({ id })
        .leftJoinAndSelect('todo.author', 'user')
        .getOne();
      if (todo.author.id === userId) await this.todoRepository.delete(id);
      else throw new ForbiddenException('Access denied');
    } catch (error) {
      throw error;
    }
  }
}
