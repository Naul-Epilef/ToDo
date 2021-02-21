import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
class Tasks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  Title: string;

  @Column()
  Done: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tasks;
