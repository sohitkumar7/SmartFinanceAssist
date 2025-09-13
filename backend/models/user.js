import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
      type :String,
      required: true,

    }, 
    clerkId:{
      type :String,
      required: true,
      unique: true
    }, 
    name: {
     type: String,
      required : true,
    }
},{timestamps:true});

const user = mongoose.model('user',UserSchema);
export default user;