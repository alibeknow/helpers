import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  IndexOptions,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { SPUser } from './user.model'
import { SPEmote } from '../misc'

const emoteIndexOptions: IndexOptions = {
  type: 'UNIQUE',
  unique: true,
  concurrently: true,
  prefix: 'index-',
}

@Table({
  tableName: 'users-emotes',
})
export class SPUserEmote extends Model<SPUserEmote> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Index(emoteIndexOptions)
  @ForeignKey(() => SPUser)
  @Column(DataType.INTEGER)
  userId: number

  @BelongsTo(() => SPUser)
  user: SPUser

  @Index(emoteIndexOptions)
  @ForeignKey(() => SPEmote)
  @Column(DataType.INTEGER)
  emoteId: number

  @BelongsTo(() => SPEmote)
  emote: SPEmote
}
