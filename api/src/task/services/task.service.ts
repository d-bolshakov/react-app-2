import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskListService } from '../../task-list/services/task-list.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @Inject(TaskListService) private taskListService: TaskListService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const taskList = await this.taskListService.findOne(createTaskDto.listId);
    const task = new Task();
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;
    task.dueDate = createTaskDto.dueDate;
    task.priority = createTaskDto.priority;
    task.list = taskList;
    return this.taskRepository.save(task);
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task)
      throw new HttpException(
        `Task with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    const { name, description, dueDate, priority, listId } = updateTaskDto;
    let hasChanges = false;
    if (name && name !== task.name) {
      task.name = name;
      hasChanges = true;
    }
    if (description && description !== task.description) {
      task.description = description;
      hasChanges = true;
    }
    if (dueDate && dueDate !== task.dueDate) {
      task.dueDate = dueDate;
      hasChanges = true;
    }
    if (priority && priority !== task.priority) {
      task.priority = priority;
      hasChanges = true;
    }
    if (listId && listId !== task.listId) {
      const taskList = await this.taskListService.findOne(listId);
      task.listId = listId;
      hasChanges = true;
    }
    if (hasChanges) {
      await this.taskRepository.save(task);
    }
    return task;
  }

  async remove(id: number) {
    const exists = await this.taskRepository.exists({ where: { id } });
    if (!exists)
      throw new HttpException(
        `Task with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    const { affected } = await this.taskRepository.delete({ id });
    if (affected !== 1)
      throw new HttpException(
        `Something went wrong during deleting task with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return { message: `Task with id ${id} was deleted successfuly` };
  }
}
