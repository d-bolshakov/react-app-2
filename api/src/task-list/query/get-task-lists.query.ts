import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

@Injectable()
export class GetTaskListsQuery {
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'boardId should be a number' },
  )
  @Type(() => Number)
  boardId?: number;
}
