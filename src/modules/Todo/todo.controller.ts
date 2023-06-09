import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  Req,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { TodoDto, TodoEditDto } from 'src/dto/todo.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions';
import Todo from 'src/entities/Todo.entity';

@ApiTags('Todo: creation, getting, editing, deleting')
@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly jwtService: JwtService,
  ) { }

  checkAccess(req: Request): number | null {
    if (!req.headers.authorization) {
      throw new ForbiddenException('Access denied');
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const { id } = this.jwtService.decode(token) as { id: number; };
      return id;
    } catch (error) {
      return null;
    }
  }

  @ApiBearerAuth()
  @Post('/add')
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiCreatedResponse({ description: 'Todo created succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createNewTodo(
    @Req() req: Request,
    @Body() TodoData: TodoDto,
  ): Promise<void> {
    const id = this.checkAccess(req);
    if (id) return await this.todoService.createTask(id, TodoData);
    else throw new BadRequestException('Wrong auth token format!');
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get my todos' })
  @ApiOkResponse({ description: 'Todo were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getMyTodos(@Req() req: Request): Promise<Todo[]> {
    const id = this.checkAccess(req);
    if (id) return await this.todoService.getMyTodoTasks(id);
    else throw new BadRequestException('Wrong auth token format!');
  }

  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({ summary: 'Edit my todo' })
  @ApiOkResponse({ description: 'The todo was updated successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async updateTodo(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() TodoData: TodoEditDto,
  ): Promise<void> {
    const userId = this.checkAccess(req);
    if (userId) return await this.todoService.updateTodo(userId, id, TodoData);
    else throw new BadRequestException('Wrong auth token format!');
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete my todo' })
  @ApiOkResponse({ description: 'The todo was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async deleteTodo(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<void> {
    const userId = this.checkAccess(req);
    if (userId) return await this.todoService.deleteTodo(userId, id);
    else throw new BadRequestException('Wrong auth token format!');
  }
}