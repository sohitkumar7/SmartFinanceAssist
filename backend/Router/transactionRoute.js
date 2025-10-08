import express from "express";
import { createTransation } from "../controller/transactionController.js";

const router = express.Router();

router.post("/create",createTransation)

export default router;
