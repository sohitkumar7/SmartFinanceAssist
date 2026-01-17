import User from "../models/user.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";

export const createAccount = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { name, balance, type, isDefault } = req.body;

    // Find user by clerkId
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist",
      });
    }

    const allAccount = await Account.find({ userId: user._id });
    let isdefault = isDefault;
    if (allAccount.length == 0) {
      isdefault = true;
    }

    const newAccount = new Account({
      name,
      userId: user._id, // Use user._id (ObjectId) instead of clerkId (String)
      balance,
      isDefault: isdefault,
      AccountType: type,
    });

    await newAccount.save();
    res.status(200).json({
      success: true,
      message: "Account Created successfully",
      accounts: newAccount,
    });
  } catch (error) {
    console.log("error in create accouunt controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { userId } = req.auth();

    // Find user by clerkId
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist",
      });
    }

    const allAccount = await Account.find({ userId: user._id });

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

export const makeOneDefault = async (req, res) => {
  const { userId } = req.auth();
  const { accountId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Account ID format." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const targetAccount = await Account.findById(accountId).session(session);

    if (!targetAccount) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "Account not found." });
    }

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: userId }).session(session);

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate ownership - use user._id (ObjectId) instead of userId (Clerk string)
    if (!targetAccount.userId.equals(user._id)) {
      await session.abortTransaction();
      return res.status(403).json({ success: false, message: "Not authorized to modify this account" });
    }

    await Account.updateMany(
      { userId: user._id },
      { $set: { isDefault: false } },
      { session }
    );

    const updatedTarget = await Account.findByIdAndUpdate(
      accountId,
      { $set: { isDefault: true } },
      { new: true, session } 
    );

    await session.commitTransaction();
    session.endSession();

    console.log(
      `Default account set for user ${userId}. New default ID: ${updatedTarget._id}`
    );

    res.status(200).json({
      success: true,
      message: "Default account successfully updated.",
      updatedAccount: updatedTarget,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Transaction failed during default account update:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update default account due to a server error.",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { accountId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account ID format.",
      });
    }

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate ownership - use user._id (ObjectId) instead of userId (Clerk string)
    if (!account.userId.equals(user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this account" });
    }

    await Account.findByIdAndDelete(accountId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",  
      accountId,
    });

  } catch (error) {
    console.log("Error in deleteAccount controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

