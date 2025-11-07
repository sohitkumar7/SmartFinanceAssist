import Transaction from "../models/transaction.js";

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

    const savedTransaction = await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: savedTransaction,
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
    console.log("accountId", accountId);
    const allTransaction = await Transaction.find({ accountId });
    console.log("transection", allTransaction);
    return res.status(200).json({
      success: true,
      allTransction: allTransaction,
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

    console.log(selectedIds,"selectedids");

    if (!selectedIds || !Array.isArray(selectedIds) || selectedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "selected ids size is 0",
      });
    }

    await Transaction.deleteMany({ _id: { $in: selectedIds } });

    const allTransaction = await Transaction.find({ accountId });
    console.log("transection", allTransaction);
    return res.status(200).json({
      success: true,
      allTransction: allTransaction,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "error in deleting delete transction",
      errors : error.message
    });
  }
};
