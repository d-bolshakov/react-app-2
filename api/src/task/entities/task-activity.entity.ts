import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Task } from './task.entity';
import { TaskEventTypes } from '../events/task-events-types.enum';

@Entity()
export class TaskActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { cascade: true, nullable: false })
  @JoinColumn()
  task: Task;

  @RelationId((activity: TaskActivity) => activity.task)
  taskId: number;

  @Column({ type: 'json', nullable: false })
  payload: any;

  @Column({ type: 'varchar', nullable: false })
  type: TaskEventTypes;
}
