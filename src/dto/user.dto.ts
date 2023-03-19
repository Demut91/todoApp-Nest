import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Name of the user',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: "User's e-mail",
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  password: string;
}
