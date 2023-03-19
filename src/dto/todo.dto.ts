import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import User from 'src/entities/User.entity';

export class TodoDto {
  @IsString()
  @ApiProperty({
    example: 'Name of the task',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Some description for task' })
  description?: string;

  // @IsBoolean()
  // @ApiProperty({
  //   type: 'boolean',
  //   description: 'Status: completed or not',
  // })
  // isCompleted: boolean;

  // @IsOptional()
  // @ApiProperty({
  //   type: 'number',
  //   description: 'Author of the task',
  // })
  // author: User;
}
