import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskListService } from '../services/task-list.service';
import { CreateTaskListDto } from '../dto/create-task-list.dto';
import { UpdateTaskListDto } from '../dto/update-task-list.dto';

@Controller('task-lists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListService.create(createTaskListDto);
  }

  @Get()
  findAll() {
    return this.taskListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskListService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateTaskListDto: UpdateTaskListDto,
  ) {
    return this.taskListService.update(+id, updateTaskListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListService.remove(+id);
  }
}
