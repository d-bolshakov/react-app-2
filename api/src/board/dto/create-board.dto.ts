import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString({ message: 'name should be a string' })
  name: string;
}
