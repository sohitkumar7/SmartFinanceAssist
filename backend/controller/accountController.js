import User from "../models/user.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";

export const createAccount = async (req, res) => {
  try {
    const { name ,userId, balance, type,isDefault} = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format.", // Responds with 400 for a malformed ID
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // 3. Find User by their _id
    const find_user = await User.findById(userObjectId); // Mongoose knows to query the _id

    if (!find_user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist",
      });
    }
    
    const allAccount = await Account.find({ userId: userObjectId });

    if (allAccount.length == 0) {
      isDefault = true;
    }

    const newAccount = new Account({
      name,
      userId,
      balance,
      isDefault,
      AccountType : type,
    });

    await newAccount.save();
    res.status(200).json({
      success: true,
      message: "Account Created successfully",
      accounts : newAccount
    });
  } catch (error) {
    console.log("error in create accouunt controller",error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { UserId } = req.params;

    // Now, assign it to a variable with the convention you prefer for consistency
    const userId = UserId;

    // Add the trim() safety check here, but now it works because UserId is defined
    const trimmedUserId = userId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format.",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(trimmedUserId);

    const find_user = await User.findById(userObjectId); // Mongoose knows to query the _id

    if (!find_user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist",
      });
    }

    const allAccount = await Account.find({ userId: userObjectId });

    res.status(200).json({
      success: true,
      accounts: allAccount,
    });
  } catch (error) {
    console.log("error is getAccount Controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};


