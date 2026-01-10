import express from "express";
import { upload } from "../middleware/upload.js";
import { createTransactionFromReceipt } from "../controller/aitransaction.controller.js";

const router = express.Router();

router.post(
  "/ai/receipt-transaction",
  upload.single("receipt"),
  createTransactionFromReceipt
);

export default router;
