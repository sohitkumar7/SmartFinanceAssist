import express from "express";
import { createTransation, deleteAllTransaction, fetchAllTransaction } from "../controller/transactionController.js";

const router = express.Router();

router.post("/create",createTransation)
router.get("/get/all/:accountId",fetchAllTransaction)

router.post("/delete/all",deleteAllTransaction)

export default router;
