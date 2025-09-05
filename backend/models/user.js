import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: {
     type: String, 
     required: true, 
     unique: true 
    },
    
    email: String,
    name: String,
    
},{timestams:true});

const user = mongoose.model('user',UserSchema);
export default user;