import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'E-mail of the user',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  password: string;
}
