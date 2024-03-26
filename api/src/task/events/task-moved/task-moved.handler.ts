import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskActivity } from '../../entities/task-activity.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskMovedEvent } from './task-moved.event';
import { TaskEventTypes } from '../task-events-types.enum';

@Injectable()
export class TaskMovedHandler {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}
  @OnEvent(TaskEventTypes.TASK_MOVED)
  handleTaskMoved(event: TaskMovedEvent) {
    const activity = this.taskActivityRepository.create({
      task: { id: event.taskId },
      payload: { fromListId: event.fromListId, toListId: event.toListId },
      type: TaskEventTypes.TASK_MOVED,
    });
    this.taskActivityRepository.insert(activity);
  }
}
