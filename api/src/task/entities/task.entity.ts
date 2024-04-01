import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
} from 'typeorm';
import { TaskPriority } from './task-priority.enum';
import { TaskList } from '../../task-list/entities/task-list.entity';
import { TaskActivity } from './task-activity.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  description: string;

  @Column({ type: 'timestamptz', nullable: false })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskPriority, nullable: false })
  priority: TaskPriority;

  @ManyToOne(() => TaskList, (list: TaskList) => list.tasks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  list: Relation<TaskList>;

  @RelationId((task: Task) => task.list)
  listId: number;

  @OneToMany(() => TaskActivity, (activity: TaskActivity) => activity.task)
  activity: Relation<TaskActivity[]>;
}
