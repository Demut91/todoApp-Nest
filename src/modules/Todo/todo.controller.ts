import { Controller, Post, Body, Headers, ForbiddenException, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { TodoDto } from 'src/dto/todo.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly jwtService: JwtService,
  ) { }

  async checkAccess(req: Request) {
    if (!req.headers.authorization) {
      throw new ForbiddenException(
        'Access denied'
      );
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const { id } = (this.jwtService.decode(token)) as { id: number; };
      return id;
    } catch (error) {
      return null;
    }
  }

  @Post('/add-todo')
  @ApiOperation({ summary: 'Create a new todo' })
  async createNewTodo(
    @Req() req: Request,
    @Body() TodoData: TodoDto
  ): Promise<void> {
    const id = await this.checkAccess(req);
    if (id)
      return await this.todoService.createTask(id, TodoData);
    else throw new BadRequestException(
      'Wrong auth token format!'
    );
  }

  // @Post('/signin')
  // @ApiOperation({ summary: 'Log in' })
  // async logIn(@Body() LoginData: LoginDto): Promise<AuthResponse> {
  //   return await this.usersService.login(LoginData);
  // }
}