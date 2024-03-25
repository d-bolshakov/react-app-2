import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskListDto } from '../dto/create-task-list.dto';
import { UpdateTaskListDto } from '../dto/update-task-list.dto';
import { TaskList } from '../entities/task-list.entity';

@Injectable()
export class TaskListService {
  private taskLists: TaskList[] = [];
  create(createTaskListDto: CreateTaskListDto) {
    const taskList = { id: Date.now(), name: createTaskListDto.name };
    this.taskLists.push(taskList);
    return taskList;
  }

  findAll() {
    return this.taskLists;
  }

  findOne(id: number) {
    const taskList = this.taskLists.find((item) => item.id === id);
    if (!taskList)
      throw new HttpException(
        `Task list with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    return taskList;
  }

  update(id: number, updateTaskListDto: UpdateTaskListDto) {
    const taskList = this.taskLists.find((item) => item.id === id);
    if (!taskList)
      throw new HttpException(
        `Task list with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    taskList.name = updateTaskListDto.name;
    return taskList;
  }

  remove(id: number) {
    const taskList = this.taskLists.find((item) => item.id === id);
    if (!taskList)
      throw new HttpException(
        `Task list with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    this.taskLists.filter((item) => item.id !== id);
  }
}
