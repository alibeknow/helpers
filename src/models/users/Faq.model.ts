import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    IsEmail,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { SPUser } from "./User.model";

@Table({
    modelName: "faq",
})
export class Faq extends Model<Faq> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(true)
    @Column({ type: DataType.TEXT })
    name: string;

    @AllowNull(false)
    @IsEmail
    @Column({ type: DataType.TEXT })
    email: string;

    @AllowNull(false)
    @Column(DataType.ENUM("PC", "PLAYSTATION 4", "Xbox One", "Nintendo Switch", "Android", "IOS"))
    platform: "PC" | "PLAYSTATION 4" | "Xbox One" | "Nintendo Switch" | "Android" | "IOS";

    @AllowNull(false)
    @Column(DataType.ENUM("Bug detected", "No points counted", "No account is linked", "Other"))
    issue: "Bug detected" | "No points counted" | "No account is linked" | "Other";

    @ForeignKey(() => SPUser)
    @AllowNull(true)
    @Column
    userId: number;

    @BelongsTo(() => SPUser)
    users: SPUser;
}
