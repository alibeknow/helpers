import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ITwitchAuth } from '@wnm.development/fortnite-social-pass-types';
import { SPUser } from '../users/User.model';

@Table({
  tableName: 'creators',
})
export class SPTwitchCreator extends Model<SPTwitchCreator> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.TEXT)
  twitchUserId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  login: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  token: ITwitchAuth;

  @Column('TIMESTAMP')
  tokenExpiresDate: Date | null;

  @Unique
  @Column(DataType.TEXT)
  urlToken: string;

  @AllowNull(false)
  @Default(33214)
  @Column(DataType.INTEGER)
  gameId: number;

  @HasMany(() => SPUser)
  users: SPUser[];
}
