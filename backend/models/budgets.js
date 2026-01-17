import mongoose from "mongoose";

const budgetSchea = new mongoose.Schema({

    amount:{
        type:Number,
    },
    lastAlertSent:{
        type:Date,
    },
    AccountId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }

},{timestamps:true})

const budget = mongoose.model("buddet",budgetSchea);
export default budget;
