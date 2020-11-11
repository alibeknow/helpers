import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { SPUser } from './user.model'

@Table({
  tableName: 'users-drops',
})
export class SPUserDrops extends Model<SPUserDrops> {
  @PrimaryKey
  @Column(DataType.TEXT)
  id: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  benefitId: string

  @Index
  @ForeignKey(() => SPUser)
  @Column({
    type: DataType.TEXT,
    references: { key: 'twitchUserId', model: 'users' },
  })
  userTwitchId: string

  @BelongsTo(() => SPUser, {
    foreignKey: 'userTwitchId',
  })
  user: SPUser

  @Column(DataType.RANGE(DataType.DATE))
  timestamp: Date
}
