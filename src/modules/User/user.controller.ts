import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create a new user' })
  async createPatient(@Body() UserData: UserDto): Promise<void> {
    await this.usersService.register(UserData);
  }
}
