import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: {
     type: String, 
     required: true, 
     unique: true 
    },
    
    email:{
      type :String,
      required: true,

    }, 
    name: {
     type: String,
      required : true,
    }
},{timestamps:true});

const user = mongoose.model('user',UserSchema);
export default user;