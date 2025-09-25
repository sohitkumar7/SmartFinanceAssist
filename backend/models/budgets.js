import mongoose from "mongoose";

const budgetSchea = new mongoose.Schema({

    amout:{
        type:Number,
    },
    lastAlertSent:{
        type:Date,
    },
    userId:{
        type:String,
        required:true,

    },

},{timestamps:true})

const budget = mongoose.model("buddet",budgetSchea);
export default budget;