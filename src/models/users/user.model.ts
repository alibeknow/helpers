import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Index,
  IndexOptions,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import { SPTwitchCreator } from '../misc/twitchCreator.model'
import { SPEmote } from '../misc/emote.model'
import { SPUserDrops } from './userDrops.model'
import { SPStats } from '../stats/stats.model'
import { SPUserDay } from './userDay.model'
import { SPUserTask } from './userTask.model'

const indexOptions: IndexOptions = {
  type: 'UNIQUE',
  unique: true,
  concurrently: true,
  prefix: 'index-',
}

@Table({
  modelName: 'user',
})
export class SPUser extends Model<SPUser> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @AllowNull(false)
  @Unique
  @Column(DataType.TEXT)
  nickname: string

  @Column(DataType.BOOLEAN)
  isFortniteAccountClosed: boolean

  @AllowNull(false)
  @Index(indexOptions)
  @Unique
  @Column(DataType.TEXT)
  epicUserId: string

  @Index(indexOptions)
  @Unique
  @Column(DataType.TEXT)
  twitchUserId: string

  @ForeignKey(() => SPTwitchCreator)
  @Column(DataType.INTEGER)
  creatorId: number

  @BelongsTo(() => SPTwitchCreator)
  creator: SPTwitchCreator

  @AllowNull(false)
  @Column(DataType.ENUM('SOCIAL', 'FAN'))
  passType: 'SOCIAL' | 'FAN'

  @HasMany(() => SPEmote)
  emotes: SPEmote[]

  @HasMany(() => SPUserDrops)
  drops: SPUserDrops[]

  @HasMany(() => SPStats, { onDelete: 'cascade' })
  stats: SPStats[]

  @HasMany(() => SPUserDay, { onDelete: 'cascade' })
  days: SPUserDay[]

  @HasMany(() => SPUserTask, { onDelete: 'cascade' })
  tasks: SPUserTask[]
}
