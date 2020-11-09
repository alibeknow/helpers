import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { ISPTaskDays } from '../../types/misc'
import { SPUser } from './user.model'

@Table({
  tableName: 'users-days'
})
export class SPUserDay extends Model<SPUserDay> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  day: ISPTaskDays

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  completed: boolean

  @ForeignKey(() => SPUser)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number

  @BelongsTo(() => SPUser, { onDelete: 'cascade' })
  user: SPUser
}
