import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskActivity } from '../entities/task-activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskActivityService {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}

  findAll() {
    return this.taskActivityRepository.find();
  }

  findByTask(taskId: number) {
    return this.taskActivityRepository.find({
      where: { task: { id: taskId } },
    });
  }
}
