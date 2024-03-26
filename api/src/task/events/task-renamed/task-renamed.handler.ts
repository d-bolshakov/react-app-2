import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskActivity } from '../../entities/task-activity.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskRenamedEvent } from './task-renamed.event';
import { TaskEventTypes } from '../task-events-types.enum';

@Injectable()
export class TaskRenamedHandler {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}
  @OnEvent(TaskEventTypes.TASK_RENAMED)
  handleTaskRenamed(event: TaskRenamedEvent) {
    const activity = this.taskActivityRepository.create({
      task: { id: event.taskId },
      payload: { from: event.from, to: event.to },
      type: TaskEventTypes.TASK_RENAMED,
    });
    this.taskActivityRepository.insert(activity);
  }
}
