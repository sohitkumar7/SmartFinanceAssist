import Transaction from "../models/transaction.js";
import Account from "../models/Account.js";
import User from "../models/user.js";

export const dashboarddata = async (req, res) => {
  try {
    const { userId: clerkId } = req.auth();

    // Get user from database using clerkId
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Find all accounts belonging to user
    const accounts = await Account.find({ userId: user._id });
    
    if (accounts.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const accountIds = accounts.map(account => account._id);

    // Find all transactions for user's accounts
    const alltransaction = await Transaction.find({ accountId: { $in: accountIds } }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: alltransaction,
    });

  } catch (error) {
    console.log("error in dashboarddata controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: error.message,
    });
  }
};

