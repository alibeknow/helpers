import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'

@Table({
  tableName: 'users-tokens',
})
export class SPUserToken extends Model<SPUserToken> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  creatorTwitchId: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  accessToken: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  refreshToken: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  expiresIn: number
}
