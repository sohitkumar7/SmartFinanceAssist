import mongoose from "mongoose"

const AccountType = ['CURRENT', 'SAVING'];

const AccountSchema = new mongoose.Schema({
    name:{
       type: String,
        required:true,
    },
    balance:{
        type: Number,
        required:true,
    },
    isDefault:{
        type:Boolean,
        default:false,
    },
    AccountType: {
        type:String,
        enum : AccountType,
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},{timestamps:true})

const account = mongoose.model('account',AccountSchema);
export default account;
