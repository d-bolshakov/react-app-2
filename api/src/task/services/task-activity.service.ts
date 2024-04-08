import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskActivity } from '../entities/task-activity.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { GetTaskActivityQuery } from '../query/get-task-activity.query';

@Injectable()
export class TaskActivityService {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}

  findAll(query: GetTaskActivityQuery) {
    const conditions: FindOptionsWhere<TaskActivity> = {};
    if (query.boardId)
      conditions.task = { list: { board: { id: query.boardId } } };
    return this.taskActivityRepository.find({ where: conditions });
  }

  findByTask(taskId: number) {
    return this.taskActivityRepository.find({
      where: { task: { id: taskId } },
    });
  }
}
