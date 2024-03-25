import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskListDto } from '../dto/create-task-list.dto';
import { UpdateTaskListDto } from '../dto/update-task-list.dto';
import { TaskList } from '../entities/task-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}
  async create(createTaskListDto: CreateTaskListDto) {
    const existsWithName = await this.taskListRepository.exists({
      where: { name: createTaskListDto.name },
    });
    if (existsWithName)
      throw new HttpException(
        `Task list with name ${createTaskListDto.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    const taskList = new TaskList();
    taskList.name = createTaskListDto.name;
    return this.taskListRepository.save(taskList);
  }

  async findAll() {
    return this.taskListRepository.find();
  }

  async findOne(id: number) {
    const taskList = await this.taskListRepository.findOne({ where: { id } });
    if (!taskList)
      throw new HttpException(
        `Task list with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    return taskList;
  }

  async update(id: number, updateTaskListDto: UpdateTaskListDto) {
    const taskList = await this.findOne(id);
    taskList.name = updateTaskListDto.name;
    return this.taskListRepository.save(taskList);
  }

  async remove(id: number) {
    const existsWithId = await this.taskListRepository.exists({
      where: { id },
    });
    if (!existsWithId)
      throw new HttpException(
        `Task list with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    const { affected } = await this.taskListRepository.delete({ id });
    if (affected !== 1)
      throw new HttpException(
        `Something went wrong during deleting task list with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return { message: `Task list with id ${id} was deleted successfuly` };
  }
}
