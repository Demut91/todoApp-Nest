import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the task',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Some description for task' })
  description?: string;
}

export class TodoEditDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Name of the task',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Some description for task' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: 'boolean',
    description: 'Status: completed or not',
  })
  isCompleted?: boolean;
}
