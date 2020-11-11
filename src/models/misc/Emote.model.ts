import { AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'
import { SPUserEmote } from '../users/UserEmote.model'
import { SPUser } from '../users/User.model'

@Table({
  tableName: 'emotes',
})
export class SPEmote extends Model<SPEmote> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Unique
  @AllowNull(false)
  @Column(DataType.TEXT)
  code: string

  @BelongsToMany(() => SPUser, () => SPUserEmote)
  users: SPUser[]
}
