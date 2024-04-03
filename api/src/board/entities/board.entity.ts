import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { TaskList } from '../../task-list/entities/task-list.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @OneToMany(() => TaskList, (list: TaskList) => list.board, { cascade: true })
  taskLists: Relation<TaskList[]>;
}
