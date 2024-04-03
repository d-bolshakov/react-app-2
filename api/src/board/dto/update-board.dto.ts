import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString({ message: 'name should be a string' })
  name: string;
}
