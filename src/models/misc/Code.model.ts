import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "codes"
})
export class SPCode extends Model<SPCode> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  code: string;

  @AllowNull(false)
  @Default("UNUSED")
  @Column(DataType.TEXT)
  codeStatus: string;
}
