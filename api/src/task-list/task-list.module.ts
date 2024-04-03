import { Module } from '@nestjs/common';
import { TaskListService } from './services/task-list.service';
import { TaskListController } from './controllers/task-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList]), BoardModule],
  controllers: [TaskListController],
  providers: [TaskListService],
  exports: [TaskListService],
})
export class TaskListModule {}
