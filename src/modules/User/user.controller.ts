import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthResponse } from 'src/types/authResponse';
import { LoginDto } from 'src/dto/login.dto';

@ApiTags('Registration/Autorization')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'Account created succesfully' })
  async createAccount(@Body() UserData: UserDto): Promise<AuthResponse> {
    return await this.userService.register(UserData);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Log in' })
  @ApiCreatedResponse({ description: 'Login succes' })
  async logIn(@Body() LoginData: LoginDto): Promise<AuthResponse> {
    return await this.userService.login(LoginData);
  }
}
