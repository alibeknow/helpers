import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { FNStatsAllModesKeys, FNStatsItemsKeys, FNStatsModesKeys } from '@wnm.development/fortnite-api'
import { SPStats } from './stats.model'

@Table({
  tableName: 'stats-items',
})
export class SPStatsItem extends Model<SPStatsItem> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  mode: FNStatsAllModesKeys

  @AllowNull(false)
  @Column(DataType.TEXT)
  field: FNStatsItemsKeys

  @AllowNull(false)
  @Column(DataType.BIGINT)
  value: number

  @Index
  @AllowNull(false)
  @ForeignKey(() => SPStats)
  @Column(DataType.INTEGER)
  statsId: number

  @BelongsTo(() => SPStats, { onDelete: 'cascade' })
  stats: SPStats
}
