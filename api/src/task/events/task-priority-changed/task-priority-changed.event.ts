import { TaskPriority } from '../../entities/task-priority.enum';

export class TaskPriorityChangedEvent {
  constructor(taskId: number, from: TaskPriority, to: TaskPriority) {
    this.taskId = taskId;
    this.from = from;
    this.to = to;
  }
  taskId: number;
  from: TaskPriority;
  to: TaskPriority;
  timestamp: Date = new Date();
}
