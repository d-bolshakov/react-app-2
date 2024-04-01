import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
} from 'typeorm';
import { Task } from './task.entity';
import { TaskEventTypes } from '../events/task-events-types.enum';

@Entity()
export class TaskActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task: Task) => task.activity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  task: Relation<Task>;

  @RelationId((activity: TaskActivity) => activity.task)
  taskId: number;

  @Column({ type: 'json', nullable: false })
  payload: any;

  @Column({ type: 'varchar', nullable: false })
  type: TaskEventTypes;

  @Column({ type: 'timestamptz', nullable: false })
  timestamp: Date;
}
