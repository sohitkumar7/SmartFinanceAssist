import Account from "../models/Account.js";
import Budget from "../models/budgets.js";

export const fetchBudget = async (req, res) => {
  try {
    const { userId } = req.params;

    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget is not set yet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      data: budget,
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
    const { userId, amount } = req.body;

    let budget = await Budget.findOne({ userId });

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
      userId,
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
