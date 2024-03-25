import { Module } from '@nestjs/common';
import { TaskListModule } from './task-list/task-list.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TaskListModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
