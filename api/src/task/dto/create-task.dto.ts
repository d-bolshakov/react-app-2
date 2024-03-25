import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { TaskPriority } from '../entities/task-priority.enum';

export class CreateTaskDto {
  @IsString({ message: 'name should be a string' })
  @Length(2, 20, {
    message: 'name lenght should be between 2 and 20 characters',
  })
  name: string;

  @IsString({ message: 'description should be a string' })
  @Length(2, 150, {
    message: 'description lenght should be between 2 and 150 characters',
  })
  description: string;

  @Type(() => Date)
  @IsDate({ message: 'dueDate should be a date' })
  dueDate: Date;

  @IsEnum(TaskPriority, {
    message: `priority should be either ${Object.values(TaskPriority).join(', ')}`,
  })
  priority: TaskPriority;

  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'listId should be a number' },
  )
  listId: number;
}
