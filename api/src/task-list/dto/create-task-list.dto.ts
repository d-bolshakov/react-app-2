import { IsString } from 'class-validator';

export class CreateTaskListDto {
  @IsString({ message: 'name should be a string' })
  name: string;
}
