import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";
import sequelize from "../conf/db.js";

export interface IUser {
  id?: number | undefined;
  first_name: string;
  last_name: string;
  uaa_email: string;
  password_hash: string;
  phone_number?: string | null | undefined;
  driver_rating?: number | undefined;
  passenger_rating?: number | undefined;
  is_driver?: boolean | number | undefined;
  license_number?: string | null | undefined;
  is_enabled?: boolean | undefined;
  created_at?: Date | undefined;
  updated_at?: Date | undefined;
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare first_name: string;
  declare last_name: string;
  declare uaa_email: string;
  declare password_hash: string;
  declare phone_number: CreationOptional<string | null>;
  declare driver_rating: CreationOptional<number>;
  declare passenger_rating: CreationOptional<number>;
  declare is_driver: CreationOptional<boolean>;
  declare license_number: CreationOptional<string | null>;
  declare is_enabled: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    uaa_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    driver_rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.0,
    },
    passenger_rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.0,
    },
    is_driver: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export default User;