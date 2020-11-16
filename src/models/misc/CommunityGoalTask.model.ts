import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { SPTask } from './Task.model';

@Table({
  tableName: 'community-goal-tasks',
})
export class SPCommunityGoalTask extends Model<SPCommunityGoalTask> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  progress: number;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  completed: boolean;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  awardGiven: boolean;

  @ForeignKey(() => SPTask)
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  taskId: number;

  @BelongsTo(() => SPTask, { onDelete: 'cascade' })
  task: SPTask;
}
