import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthResponse } from 'src/types/authResponse';
import { LoginDto } from 'src/dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create a new user' })
  async createAccount(@Body() UserData: UserDto): Promise<AuthResponse> {
    return await this.usersService.register(UserData);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Log in' })
  async logIn(@Body() LoginData: LoginDto): Promise<AuthResponse> {
    return await this.usersService.login(LoginData);
  }
}
