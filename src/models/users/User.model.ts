import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
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
import { SPTwitchCreator } from '../misc/TwitchCreator.model'
import { SPEmote } from '../misc/Emote.model'
import { SPUserDrops } from './UserDrops.model'
import { SPStats } from '../stats/Stats.model'
import { SPUserDay } from './UserDay.model'
import { SPUserTask } from './UserTask.model'
import { ISPUserPassType } from '@wnm.development/fortnite-social-pass-types'
import { SPUserEmote } from './userEmotes.model'

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
  passType: ISPUserPassType

  @BelongsToMany(() => SPEmote, () => SPUserEmote)
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
