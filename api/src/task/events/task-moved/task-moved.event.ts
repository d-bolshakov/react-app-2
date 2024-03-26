export class TaskMovedEvent {
  constructor(taskId: number, fromListId: number, toListId: number) {
    this.taskId = taskId;
    this.fromListId = fromListId;
    this.toListId = toListId;
  }
  taskId: number;
  fromListId: number;
  toListId: number;
}
