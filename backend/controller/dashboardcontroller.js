import Transaction from "../models/transaction.js";

export const dashboarddata = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const alltransaction = await Transaction.find({ userId }).sort({ date: -1 });

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
