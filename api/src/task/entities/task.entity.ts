import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TaskPriority } from './task-priority.enum';
import { TaskList } from '../../task-list/entities/task-list.entity';

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

  @OneToOne(() => TaskList, { cascade: true, nullable: false })
  @JoinColumn()
  list: TaskList;

  @RelationId((task: Task) => task.list)
  listId: number;
}
