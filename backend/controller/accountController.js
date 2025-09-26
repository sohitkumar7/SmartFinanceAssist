import User from "../models/user.js"
import Account from "../models/Account.js"

export const createAccount = async(req,res)=> {

    try {
          
        const {userId,balance,AccountType} = req.body;

        const  find_user = await User.findById(userId);

        if(!find_user){
            return res.status(404).json({
                success:false,
                message:"user does not exist"
            })
        }

        const existingAccounts = await Account.find({ userId: userId });
        let isDefault = false;

        if(existingAccounts.length  == 0){
            isDefault = true;
        }

        const newAccount = new Account({
            userId,
            balance,
            isDefault : isDefault,
            AccountType,
            
        })

        await newAccount.save();
        res.status(200).json({
            success:true,
            message:"Account Created successfullt"
        })
        
    } catch (error) {
        console.log("error in create accouunt controller")
        res.status(500).json({
            success: false,
            message : "internal server error",
        })
    }

}  

export const getAccount = async(req,res) => {

    try {

        const {userId} = req.params;

        const  find_user = await User.findById(userId);

        if(!find_user){
            return res.status(404).json({
                success:false,
                message:"user does not exist"
            })
        }

        const allAccount = await Account.find({userId:userId});

        res.status(200).json({
            success:true,
            accounts : allAccount,  
        })
               
    } catch (error) {
        console.log("error is getAccount Controller");
        res.status(500).json({
            success:false,
            message:"internal server error",
        })
    }
}