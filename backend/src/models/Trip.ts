import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";
import sequelize from "../conf/db.js";

export interface ITrip {
  id?: number | undefined;
  driver_id: number;
  vehicle_id: number;
  origin_point: string;
  destination_point: string;
  total_seats: number;
  available_seats?: number | undefined;
  price_per_seat: number;
  departure_datetime: string | Date;
  status?: "scheduled" | "in_progress" | "completed" | "canceled" | undefined;
  is_enabled?: boolean | undefined;
}

export class Trip extends Model<
  InferAttributes<Trip>,
  InferCreationAttributes<Trip>
> {
  declare id: CreationOptional<number>;
  declare driver_id: number;
  declare vehicle_id: number;
  declare origin_point: string;
  declare destination_point: string;
  declare destination_lat: CreationOptional<number | null>;
  declare destination_lng: CreationOptional<number | null>;
  declare total_seats: number;
  declare available_seats: number;
  declare price_per_seat: number;
  declare departure_datetime: Date | string;
  declare status: CreationOptional<
    "scheduled" | "in_progress" | "completed" | "canceled"
  >;
  declare is_enabled: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_point: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    destination_point: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    destination_lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    destination_lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_seat: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    departure_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "in_progress", "completed", "canceled"),
      defaultValue: "scheduled",
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
    tableName: "trips",
    modelName: "Trip",
  }
);

export default Trip;