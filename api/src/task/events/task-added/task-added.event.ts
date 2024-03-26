export class TaskAddedEvent {
  constructor(taskId: number, listId: number) {
    this.taskId = taskId;
    this.listId = listId;
  }
  taskId: number;
  listId: number;
  timestamp: Date = new Date();
}
