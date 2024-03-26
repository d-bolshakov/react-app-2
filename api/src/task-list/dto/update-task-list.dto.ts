import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskListDto } from './create-task-list.dto';
import { IsString } from 'class-validator';

export class UpdateTaskListDto extends PartialType(CreateTaskListDto) {
  @IsString({ message: 'name should be a string' })
  name: string;
}
