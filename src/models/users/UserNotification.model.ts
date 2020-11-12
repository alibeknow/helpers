import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  createIndexDecorator,
  DataType,
  Default,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { ISPUserNotifications } from "@wnm.development/fortnite-social-pass-types";
import { SPUser } from "./User.model";

const UserIdSeenIndex = createIndexDecorator();

@Table({
  tableName: "users-notifications"
})
export class SPUserNotification extends Model<SPUserNotification> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  type: keyof ISPUserNotifications;

  @AllowNull(false)
  @Column(DataType.JSON)
  additionalFields: { [key: string]: any };

  @UserIdSeenIndex
  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  seen: boolean;

  @UserIdSeenIndex
  @Index
  @AllowNull(false)
  @ForeignKey(() => SPUser)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => SPUser, { onDelete: "CASCADE" })
  user: SPUser;
}
