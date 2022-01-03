import mongoose, { Model, Mongoose } from "mongoose"

mongoose.Promise = global.Promise;
import UserModel from "./user.model"
import RoleModel from "./role.model"

interface DBInterface {
    mongoose: Mongoose,
    user: Model<any>,
    role: Model<any>,
    ROLES: String[]
}

const db: DBInterface = {
    mongoose: mongoose,
    user: UserModel,
    role: RoleModel,
    ROLES: ["user", "admin", "moderator"]
};


export default db