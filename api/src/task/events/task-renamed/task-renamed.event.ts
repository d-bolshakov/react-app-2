export class TaskRenamedEvent {
  constructor(taskId: number, from: string, to: string) {
    this.taskId = taskId;
    this.from = from;
    this.to = to;
  }
  taskId: number;
  from: string;
  to: string;
}
