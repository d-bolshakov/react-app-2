import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    const existsWithName = await this.boardRepository.exists({
      where: { name: createBoardDto.name },
    });
    if (existsWithName)
      throw new BadRequestException(
        `Board with name ${createBoardDto.name} already exists`,
      );
    const taskList = new Board();
    taskList.name = createBoardDto.name;
    return this.boardRepository.save(taskList);
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board)
      throw new NotFoundException(`Board with id ${id} does not exist`);
    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(id);
    board.name = updateBoardDto.name;
    return this.boardRepository.save(board);
  }

  async remove(id: number) {
    const existsWithId = await this.boardRepository.exists({
      where: { id },
    });
    if (!existsWithId)
      throw new NotFoundException(`Board with id ${id} does not exist`);
    const { affected } = await this.boardRepository.delete({ id });
    if (affected !== 1)
      throw new InternalServerErrorException(
        `Something went wrong during deleting board with id ${id}`,
      );
    return { message: `Board with id ${id} was deleted successfully` };
  }
}
