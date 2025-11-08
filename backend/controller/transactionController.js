import Transaction from "../models/transaction.js";
import Account from "../models/Account.js"
import mongoose from "mongoose";

export const createTransation = async (req, res) => {
  try {
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
      userId,
      accountId,
    } = req.body;

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
      userId,
      accountId,
    });

    const trimmedAccountId = accountId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedAccountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account Id format.",
      });
    }

    const userAccountId = new mongoose.Types.ObjectId(trimmedAccountId);

    const Found_Account = await Account.findById(userAccountId); // Mongoose knows to query the _id

    if (!Found_Account) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist",
      });
    }

    console.log(Found_Account,"found account in create transaction")

    if (type === "INCOME") {
      Found_Account.balance += Number(amount);
    } else if (type === "EXPENSE") {
      Found_Account.balance -= Number(amount);
    }

    // 5️⃣ Save transaction and updated account
    await Found_Account.save();

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
    const { accountId } = req.params;

     const trimmedAccountId = accountId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedAccountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account Id format.",
      });
    }

    const userAccountId = new mongoose.Types.ObjectId(trimmedAccountId);

    const Found_Account = await Account.findById(userAccountId); // Mongoose knows to query the _id

    if (!Found_Account) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist",
      });
    }

    console.log("accountId", accountId);

    const allTransaction = await Transaction.find({ accountId });
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
    const { selectedIds, accountId } = req.body;

    console.log(selectedIds, "selectedids");

    if (!selectedIds || !Array.isArray(selectedIds) || selectedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "selected ids size is 0",
      });
    }

    // ✅ Validate accountId format
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid accountId format",
      });
    }

    const accountObjectId = new mongoose.Types.ObjectId(accountId);

    // ✅ Find account
    const account = await Account.findById(accountObjectId);
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
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

    const allTransaction = await Transaction.find({ accountId: accountObjectId });

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
