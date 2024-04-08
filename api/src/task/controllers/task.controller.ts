import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskActivityService } from '../services/task-activity.service';
import { GetTasksQuery } from '../query/get-tasks.query';
import { GetTaskActivityQuery } from '../query/get-task-activity.query';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskActivityService: TaskActivityService,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() getTasksQuery: GetTasksQuery) {
    return this.taskService.findAll(getTasksQuery);
  }

  @Get('/activity')
  findAllActivity(@Query() getTaskActivityQuery: GetTaskActivityQuery) {
    return this.taskActivityService.findAll(getTaskActivityQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Get(':id/activity')
  findActivityByTask(@Param('id') taskId: string) {
    return this.taskActivityService.findByTask(+taskId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
