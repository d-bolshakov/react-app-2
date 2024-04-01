import { TaskActivityType } from "./TaskActivityType";

export interface TaskActivity {
  id: number;
  type: TaskActivityType;
  payload: any;
  taskId: number;
  timestamp: Date | string;
}
