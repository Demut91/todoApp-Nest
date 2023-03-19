import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Login of the user',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  password: string;
}
