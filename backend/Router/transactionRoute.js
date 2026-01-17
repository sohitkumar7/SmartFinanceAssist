import express from "express";
import { requireAuth } from "@clerk/express";
import { createTransation, deleteAllTransaction, fetchAllTransaction } from "../controller/transactionController.js";

const router = express.Router();

router.post("/create", requireAuth(), createTransation);
router.get("/get/all/:accountId", requireAuth(), fetchAllTransaction);
router.post("/delete/all", requireAuth(), deleteAllTransaction);

export default router;
