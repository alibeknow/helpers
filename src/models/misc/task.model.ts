import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { ISPTaskCondition, ISPTaskDays, ISPTaskType } from '@wnm.development/fortnite-social-pass-types'
import { SPUserTask } from '../users'
import { SPTwitchCreatorTask } from './twitchCreatorTask.model'

@Table({
  modelName: 'task',
})
export class SPTask extends Model<SPTask> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  name: string

  // Used to hardcode
  @Column(DataType.TEXT)
  comment: string | null

  @AllowNull(false)
  @Column(DataType.INTEGER)
  needed: number

  @AllowNull(false)
  @Column(DataType.ENUM('community-goal', 'additional', 'creator-pass'))
  type: ISPTaskType

  @AllowNull(false)
  @Column(DataType.INTEGER)
  day: ISPTaskDays

  @AllowNull(false)
  @Column(DataType.JSON)
  condition: ISPTaskCondition

  @HasMany(() => SPUserTask, { onDelete: 'cascade' })
  userTasks: SPUserTask[]

  @HasMany(() => SPTwitchCreatorTask, { onDelete: 'cascade' })
  creatorTasks: SPTwitchCreatorTask[]
}
