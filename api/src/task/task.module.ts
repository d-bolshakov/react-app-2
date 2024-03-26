import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskListModule } from '../task-list/task-list.module';
import { TaskAddedHandler } from './events/task-added/task-added.handler';
import { TaskActivity } from './entities/task-activity.entity';
import { TaskRenamedHandler } from './events/task-renamed/task-renamed.handler';
import { TaskPriorityChangedHandler } from './events/task-priority-changed/task-priority-changed.handler';
import { TaskMovedHandler } from './events/task-moved/task-moved.handler';
import { TaskActivityService } from './services/task-activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskActivity]), TaskListModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskActivityService,
    TaskAddedHandler,
    TaskRenamedHandler,
    TaskPriorityChangedHandler,
    TaskMovedHandler,
  ],
})
export class TaskModule {}
