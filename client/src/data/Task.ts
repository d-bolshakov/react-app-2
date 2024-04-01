import { TaskPriority } from "./TaskPriority";

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  listId: number;
}
