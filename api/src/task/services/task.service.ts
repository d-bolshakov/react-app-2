import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskListService } from '../../task-list/services/task-list.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskAddedEvent } from '../events/task-added/task-added.event';
import { TaskRenamedEvent } from '../events/task-renamed/task-renamed.event';
import { TaskPriorityChangedEvent } from '../events/task-priority-changed/task-priority-changed.event';
import { TaskMovedEvent } from '../events/task-moved/task-moved.event';
import { TaskEventTypes } from '../events/task-events-types.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @Inject(TaskListService) private taskListService: TaskListService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const taskList = await this.taskListService.findOne(createTaskDto.listId);
    const task = new Task();
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;
    task.dueDate = createTaskDto.dueDate;
    task.priority = createTaskDto.priority;
    task.list = taskList;
    await this.taskRepository.save(task);
    this.eventEmitter.emit(
      TaskEventTypes.TASK_ADDED,
      new TaskAddedEvent(task.id, task.listId),
    );
    return task;
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
    const events = [];
    if (name && name !== task.name) {
      events.push([
        TaskEventTypes.TASK_RENAMED,
        new TaskRenamedEvent(task.id, task.name, name),
      ]);
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
      events.push([
        TaskEventTypes.TASK_PRIORITY_CHANGED,
        new TaskPriorityChangedEvent(task.id, task.priority, priority),
      ]);
      task.priority = priority;
      hasChanges = true;
    }
    if (listId && listId !== task.listId) {
      const taskList = await this.taskListService.findOne(listId);
      events.push([
        TaskEventTypes.TASK_MOVED,
        new TaskMovedEvent(task.id, task.listId, listId),
      ]);
      task.list = taskList;
      hasChanges = true;
    }
    if (hasChanges) {
      await this.taskRepository.save(task);
      events.forEach(([name, event]) => this.eventEmitter.emit(name, event));
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
