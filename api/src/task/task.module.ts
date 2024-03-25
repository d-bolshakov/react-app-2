import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskListModule } from '../task-list/task-list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskListModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
