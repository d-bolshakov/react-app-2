import { Module } from '@nestjs/common';
import { TaskListModule } from './task-list/task-list.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './task-list/entities/task-list.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskActivity } from './task/entities/task-activity.entity';

@Module({
  imports: [
    TaskListModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'tododb',
      entities: [TaskList, Task, TaskActivity],
      synchronize: true,
      logging: true,
    }),
    EventEmitterModule.forRoot(),
    TaskModule,
  ],
})
export class AppModule {}
