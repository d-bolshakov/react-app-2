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
import { Task } from '../../task/entities/task.entity';
import { Board } from '../../board/entities/board.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @OneToMany(() => Task, (task: Task) => task.list, { cascade: true })
  tasks: Relation<Task[]>;

  @ManyToOne(() => Board, (board: Board) => board.taskLists, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  board: Relation<Board>;

  @RelationId((list: TaskList) => list.board)
  boardId: number;
}
