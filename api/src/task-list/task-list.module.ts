import { Module } from '@nestjs/common';
import { TaskListService } from './services/task-list.service';
import { TaskListController } from './controllers/task-list.controller';

@Module({
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
