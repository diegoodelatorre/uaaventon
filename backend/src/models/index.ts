import User, { type IUser } from "./User.js";
import Vehicle, { type IVehicle } from "./Vehicle.js";
import Trip, { type ITrip } from "./Trip.js";

// Relation User - Vehicle (1:N)
User.hasMany(Vehicle, { foreignKey: "user_id", as: "vehicles" });
Vehicle.belongsTo(User, { foreignKey: "user_id", as: "owner" });

// Relation User - Trips as driver (1:N)
User.hasMany(Trip, { foreignKey: "driver_id", as: "drivenTrips" });
Trip.belongsTo(User, { foreignKey: "driver_id", as: "driver" });

// Relation Vehicle - Trips (1:N)
Vehicle.hasMany(Trip, { foreignKey: "vehicle_id", as: "trips" });
Trip.belongsTo(Vehicle, { foreignKey: "vehicle_id", as: "vehicle" });

export { User, Vehicle, Trip, type IUser, type IVehicle, type ITrip };