import express from "express";
import { createTransation, fetchAllTransaction } from "../controller/transactionController.js";

const router = express.Router();

router.post("/create",createTransation)
router.get("/get/all/:accountId",fetchAllTransaction)
export default router;
