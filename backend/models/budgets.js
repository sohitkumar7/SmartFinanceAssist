import mongoose from "mongoose";

const budgetSchea = new mongoose.Schema({

    amount:{
        type:Number,
    },
    lastAlertSent:{
        type:Date,
    },
    AccountId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    }

},{timestamps:true})

const budget = mongoose.model("buddet",budgetSchea);
export default budget;