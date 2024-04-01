import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TaskPriority } from '../entities/task-priority.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString({ message: 'name should be a string' })
  @Length(2, 20, {
    message: 'name lenght should be between 2 and 20 characters',
  })
  name?: string;

  @IsOptional()
  @IsString({ message: 'description should be a string' })
  @Length(2, 150, {
    message: 'description lenght should be between 2 and 150 characters',
  })
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'dueDate should be a date' })
  dueDate?: Date;

  @IsOptional()
  @IsEnum(TaskPriority, {
    message: `priority should be either ${Object.values(TaskPriority).join(', ')}`,
  })
  @Type(() => Number)
  priority?: TaskPriority;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'listId should be a number' },
  )
  listId?: number;
}
