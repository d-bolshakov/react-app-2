import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskAddedEvent } from './task-added.event';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskActivity } from '../../entities/task-activity.entity';
import { Repository } from 'typeorm';
import { TaskEventTypes } from '../task-events-types.enum';

@Injectable()
export class TaskAddedHandler {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}
  @OnEvent(TaskEventTypes.TASK_ADDED)
  handleTaskCreated(event: TaskAddedEvent) {
    const activity = this.taskActivityRepository.create({
      task: { id: event.taskId },
      payload: { listId: event.listId },
      type: TaskEventTypes.TASK_ADDED,
      timestamp: event.timestamp,
    });
    this.taskActivityRepository.save(activity);
  }
}
