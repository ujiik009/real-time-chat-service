
import mongoose, { Model } from "mongoose"

const Role: Model<any> = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

export default Role