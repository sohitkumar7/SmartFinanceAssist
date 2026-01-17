import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { createTransactionFromReceipt } from "../controller/aitransaction.controller.js";

const router = express.Router();

router.post(
  "/ai/receipt-transaction",
  requireAuth,
  upload.single("receipt"),
  createTransactionFromReceipt
);

export default router;
