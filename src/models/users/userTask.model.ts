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
} from 'sequelize-typescript'
import { SPTask } from '../misc'
import { SPUserDay } from './userDay.model'
import { SPUser } from './user.model'

@Table({
  tableName: 'users-tasks',
})
export class SPUserTask extends Model<SPUserTask> {
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

  @ForeignKey(() => SPUserDay)
  @Column(DataType.INTEGER)
  dayId: number

  @BelongsTo(() => SPUserDay, { onDelete: 'cascade' })
  day: SPUserDay

  @ForeignKey(() => SPUser)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number

  @BelongsTo(() => SPUser, { onDelete: 'cascade' })
  user: SPUser

  @ForeignKey(() => SPTask)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  taskId: number

  @BelongsTo(() => SPTask, { onDelete: 'cascade' })
  task: SPTask
}
