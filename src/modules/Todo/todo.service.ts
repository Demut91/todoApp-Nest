import {
    ConflictException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Todo from 'src/entities/Todo.entity';
import { TodoDto } from 'src/dto/todo.dto';
import User from 'src/entities/User.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createTask(userId: number, todo: TodoDto): Promise<any> {
        try {
            const author = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!author) {
                throw new ForbiddenException(
                    'Access denied'
                );
            }
            const existed = await this.todoRepository.findOne({
                where: { title: todo.title },
            });
            if (existed) {
                throw new ConflictException(
                    'Task with this title already exist!'
                );
            }
            const newTask = this.todoRepository.create({ ...todo, author, isCompleted: false });
            await this.todoRepository.save(newTask);

        } catch (error) {
            throw error;
        }
    }
}