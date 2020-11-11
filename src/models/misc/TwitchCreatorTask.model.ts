import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey, Table,
} from 'sequelize-typescript'
import { SPTwitchCreator } from './TwitchCreator.model'
import { SPTask } from './Task.model'

@Table({
  tableName: 'creators-tasks'
})
export class SPTwitchCreatorTask extends Model<SPTwitchCreatorTask> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  progress: number

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  completed: boolean

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  awardGiven: boolean

  @ForeignKey(() => SPTask)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  taskId: number

  @BelongsTo(() => SPTask, { onDelete: 'cascade' })
  task: SPTask

  @ForeignKey(() => SPTwitchCreator)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  creatorId: number

  @BelongsTo(() => SPTwitchCreator, { onDelete: 'cascade' })
  creator: SPTwitchCreator
}
