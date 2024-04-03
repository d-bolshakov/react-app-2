import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateTaskListDto {
  @IsString({ message: 'name should be a string' })
  name: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'boardId should be a number' },
  )
  @Type(() => Number)
  boardId: number;
}
