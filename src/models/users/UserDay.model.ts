import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { SPUser } from "./User.model";
import { SPUserTask } from "./UserTask.model";
import { ISPTaskDays } from "@wnm.development/fortnite-social-pass-types";

@Table({
  tableName: "users-days"
})
export class SPUserDay extends Model<SPUserDay> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  day: ISPTaskDays;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  completed: boolean;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  awardGiven: boolean;

  @Index
  @ForeignKey(() => SPUser)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => SPUser, { onDelete: "cascade" })
  user: SPUser;

  @HasMany(() => SPUserTask, { onDelete: "cascade" })
  tasks: SPUserTask[];
}
