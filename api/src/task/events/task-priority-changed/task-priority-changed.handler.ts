import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskActivity } from '../../entities/task-activity.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskPriorityChangedEvent } from './task-priority-changed.event';
import { TaskEventTypes } from '../task-events-types.enum';

@Injectable()
export class TaskPriorityChangedHandler {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}
  @OnEvent(TaskEventTypes.TASK_PRIORITY_CHANGED)
  handleTaskPriorityChanged(event: TaskPriorityChangedEvent) {
    const activity = this.taskActivityRepository.create({
      task: { id: event.taskId },
      payload: { from: event.from, to: event.to },
      type: TaskEventTypes.TASK_PRIORITY_CHANGED,
    });
    this.taskActivityRepository.insert(activity);
  }
}
