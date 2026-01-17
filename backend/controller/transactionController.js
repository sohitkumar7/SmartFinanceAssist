import Transaction from "../models/transaction.js";
import Account from "../models/Account.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const createTransation = async (req, res) => {
  try {
    const { userId: clerkId } = req.auth;
    const {
      type,
      amount,
      description,
      date,
      category,
      receiptUrl,
      isRecurring,
      recurringInterval,
      nextRecurringDate,
      lastProcessed,
      status,
      accountId,
    } = req.body;

    const trimmedAccountId = accountId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedAccountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account Id format.",
      });
    }

    const Found_Account = await Account.findById(trimmedAccountId);

    if (!Found_Account) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist",
      });
    }

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Validate ownership
    if (!Found_Account.userId.equals(user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized to create transaction on this account" });
    }

    console.log(Found_Account, "found account in create transaction");

    if (type === "INCOME") {
      Found_Account.balance += Number(amount);
    } else if (type === "EXPENSE") {
      Found_Account.balance -= Number(amount);
    }

    await Found_Account.save();

    const transaction = new Transaction({
      type,
      amount,
      description,
      date,
      category,
      receiptUrl,
      isRecurring,
      recurringInterval,
      nextRecurringDate,
      lastProcessed,
      status,
      userId: user._id, // Store user's _id (ObjectId) instead of clerkId
      accountId: Found_Account._id,
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: savedTransaction,
      updatedBalance: Found_Account.balance,
    });
  } catch (error) {
    console.log("error in createController", error);
    res.status(400).json({
      success: false,
      message: "Internal server error",
      errors: error,
    });
  }
};

export const fetchAllTransaction = async (req, res) => {
  try {
    const { userId: clerkId } = req.auth;
    const { accountId } = req.params;

    const trimmedAccountId = accountId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedAccountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account Id format.",
      });
    }

    const Found_Account = await Account.findById(trimmedAccountId);

    if (!Found_Account) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist",
      });
    }

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Validate ownership
    if (!Found_Account.userId.equals(user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized to view transactions on this account" });
    }

    console.log("accountId", accountId);

    const allTransaction = await Transaction.find({ accountId: Found_Account._id });
    console.log("transection", allTransaction);
    return res.status(200).json({
      success: true,
      allTransction: allTransaction,
      updatedBalance: Found_Account.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching allTranaction controller",
    });
  }
};

export const deleteAllTransaction = async (req, res) => {
  try {
    const { userId: clerkId } = req.auth;
    const { selectedIds, accountId } = req.body;

    console.log(selectedIds, "selectedids");

    if (!selectedIds || !Array.isArray(selectedIds) || selectedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "selected ids size is 0",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid accountId format",
      });
    }

    const accountObjectId = new mongoose.Types.ObjectId(accountId);

    const account = await Account.findById(accountObjectId);
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Validate ownership
    if (!account.userId.equals(user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized to delete transactions on this account" });
    }

    const transactionsToDelete = await Transaction.find({ _id: { $in: selectedIds } });

    transactionsToDelete.forEach((transaction) => {
      if (transaction.type === "EXPENSE") {
        account.balance += Number(transaction.amount); 
      } else if (transaction.type === "INCOME") {
        account.balance -= Number(transaction.amount);
      }
    });

    await account.save();

    await Transaction.deleteMany({ _id: { $in: selectedIds } });

    const allTransaction = await Transaction.find({ accountId: account._id });

    console.log("transection", allTransaction);

    return res.status(200).json({
      success: true,
      message: "Transactions deleted successfully and balance updated",
      allTransction: allTransaction,
      updatedBalance: account.balance,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "error in deleting delete transction",
      errors: error.message,
    });
  }
};

