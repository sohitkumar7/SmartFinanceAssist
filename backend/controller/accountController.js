import User from "../models/user.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";
export const createAccount = async (req, res) => {
  try {
    const { userId, balance, AccountType } = req.body;

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
    let isDefault = false;

    if (existingAccounts.length == 0) {
      isDefault = true;
    }

    const newAccount = new Account({
      userId,
      balance,
      isDefault: isDefault,
      AccountType,
    });

    await newAccount.save();
    res.status(200).json({
      success: true,
      message: "Account Created successfullt",
    });
  } catch (error) {
    console.log("error in create accouunt controller");
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { userId } = req.params;
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

    res.status(200).json({
      success: true,
      accounts: allAccount,
    });
  } catch (error) {
    console.log("error is getAccount Controller",error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
