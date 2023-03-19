import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User.entity';
import { UserDto } from 'src/dto/user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { AuthResponse } from 'src/types/authResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    const { email, password } = data;
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user || !(await user.comparePassword(password))) {
        throw new ConflictException('Invalid e-mail or password');
      }
      return user.getResponse();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async register(data: UserDto): Promise<AuthResponse> {
    try {
      const existed = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (existed) {
        throw new HttpException(
          'User with this email already exist!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = this.userRepository.create({ ...data });
      await this.userRepository.save(newUser);
      return newUser.getResponse();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
