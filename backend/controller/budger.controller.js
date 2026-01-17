import Account from "../models/Account.js";
import Budget from "../models/budgets.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const fetchBudget = async (req, res) => {
  try {
    const { userId: clerkId } = req.auth;
    const { accountId } = req.params;

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Validate account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Validate ownership
    if (!account.userId.equals(user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized to view budget for this account" });
    }

    const budget = await Budget.findOne({ AccountId: account._id }).lean();

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget is not set yet",
      });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const expensesAgg = await Transaction.aggregate([
      {
        $match: {
          accountId: account._id,
          type: "EXPENSE",
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } },
      },
    ]);

    const totalExpenses = expensesAgg.length > 0 ? expensesAgg[0].total : 0;

    return res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      data: {
        budget,
        currentMonthExpenses: totalExpenses,
        remaining: budget.amount - totalExpenses,
      },
    });


  } catch (error) {
    console.error("Error in budget controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createBudet = async (req, res) => {
  try {
    const { userId: clerkId } = req.auth;
    const { AccountId, amount } = req.body;

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Validate account exists
    const account = await Account.findById(AccountId);
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Validate ownership
    if (!account.userId.equals(user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized to create budget for this account" });
    }

    let budget = await Budget.findOne({ AccountId: account._id });

    if (budget) {
      // Update existing budget
      budget.amount = amount;
      await budget.save();

      return res.status(200).json({
        success: true,
        message: "Budget updated successfully",
        data: budget,
      });
    }

    // Create new budget
    budget = new Budget({
      AccountId: account._id,
      userId: user._id,
      amount,
    });

    await budget.save();

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: budget,
    });
  } catch (error) {
    console.error("Error in create budget controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

