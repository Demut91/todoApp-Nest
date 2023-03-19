import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import UserEntity from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(data: LoginDto): Promise<object> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      throw new ConflictException('Invalid email or password');
    }
    return user.toResponseObject();
  }

  async register(data: UserDto): Promise<void> {
    try {
      let user = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (user) {
        throw new ConflictException('User with this email already exist!');
      }
      user = this.userRepository.create({ ...data });
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
