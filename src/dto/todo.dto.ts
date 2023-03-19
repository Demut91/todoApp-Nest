import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
}

export class TodoEditDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Name of the task',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Some description for task' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Status: completed or not',
  })
  isCompleted?: boolean;
}
