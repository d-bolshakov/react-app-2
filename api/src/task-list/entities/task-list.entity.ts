import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @OneToMany(() => Task, (task: Task) => task.list, { cascade: true })
  tasks: Relation<Task[]>;
}
