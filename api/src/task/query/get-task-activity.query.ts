import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetTaskActivityQuery {
  @IsOptional()
  @IsNumber({}, { message: 'boardId should be a number' })
  @Type(() => Number)
  boardId?: number;
}
