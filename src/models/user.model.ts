import mongoose, { Model } from "mongoose"
interface StateUser {
    state:string;
    color:string;
    label:string;
}
const User: Model<any> = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        img_avatar:String,
        online_state:{
            state:String,
            color:String,
            label:String
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        
    })
);

export default User