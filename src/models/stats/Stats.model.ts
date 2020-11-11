import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { SPStatsItem } from './StatsItem.model'
import { SPUser } from '../users/User.model'

@Table({
  tableName: 'stats',
})
export class SPStats extends Model<SPStats> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.BOOLEAN)
  isFortniteAccountClosed: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isInitial: boolean

  @Index
  @ForeignKey(() => SPUser)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number

  @BelongsTo(() => SPUser, { onDelete: 'cascade' })
  user: SPUser

  @HasMany(() => SPStatsItem, { onDelete: 'cascade' })
  items: SPStatsItem[]
}
