import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTasksQuery {
  @IsOptional()
  @IsNumber({}, { message: 'listId should be a number' })
  @Type(() => Number)
  listId?: number;

  @IsOptional()
  @IsString({ message: 'sortBy should be a string' })
  sortBy: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: "order should be either a 'ASC' or 'DESC'",
  })
  order: string;
}
