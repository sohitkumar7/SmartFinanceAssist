import { GoogleGenerativeAI } from "@google/generative-ai";
import Transaction from "../models/transaction.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const createTransactionFromReceipt = async (req, res) => {
  try {
    const { accountId } = req.body;

    // 1️⃣ Validate receipt image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Receipt image required",
      });
    }

    // 2️⃣ Validate accountId
    if (!accountId) {
      return res.status(400).json({
        success: false,
        message: "accountId is required",
      });
    }

    const trimmedAccountId = accountId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedAccountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account Id format.",
      });
    }

    const accountObjectId = new mongoose.Types.ObjectId(trimmedAccountId);

    const Found_Account = await Account.findById(accountObjectId);

    if (!Found_Account) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist",
      });
    }

    // 3️⃣ Convert image to base64
    const imageBase64 = req.file.buffer.toString("base64");

    // 4️⃣ Gemini Prompt
    const prompt = `
You are a receipt parser.
Extract details and return ONLY valid JSON.

{
  "amount": number,
  "date": "YYYY-MM-DD",
  "description": string,
  "category": string
}

Rules:
- Category must be one of: food, groceries, travel, shopping, rent, utilities, other
- If date missing, use today's date
`;

    // 5️⃣ Call Gemini
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageBase64,
        },
      },
    ]);

    const text = result.response.text();

    let extracted;
    try {
      extracted = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI response not valid JSON",
        raw: text,
      });
    }

    // 6️⃣ Validate AI output
    if (!extracted.amount || !extracted.category) {
      return res.status(400).json({
        success: false,
        message: "Incomplete data from AI",
        extracted,
      });
    }

    // 7️⃣ Prepare date (force 08:00 UTC)
    const dateObj = new Date(extracted.date || new Date());
    dateObj.setUTCHours(8, 0, 0, 0);

    // 8️⃣ Create transaction (same as manual)
    const transaction = new Transaction({
      type: "EXPENSE",
      amount: Number(extracted.amount),
      description: extracted.description || "Receipt Expense",
      category: extracted.category.toLowerCase(),
      date: dateObj.toISOString(),
      receiptUrl: "", // optional
      isRecurring: false,
      status: "COMPLETED",
      accountId: accountObjectId,
    });

    // 9️⃣ Update account balance (same logic as manual)
    Found_Account.balance -= Number(extracted.amount);

    // 🔟 Save both
    await Found_Account.save();
    const savedTransaction = await transaction.save();

    // 1️⃣1️⃣ Response (same pattern as manual)
    return res.status(201).json({
      success: true,
      message: "Transaction created from receipt",
      data: savedTransaction,
      updatedBalance: Found_Account.balance,
    });

  } catch (error) {
    console.error("AI Receipt Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process receipt transaction",
      errors: error.message,
    });
  }
};
