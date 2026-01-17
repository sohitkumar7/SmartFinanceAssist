import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { fetchBudget, createBudet } from "../controller/budger.controller.js";

const router = express.Router();

router.get("/fetchBudget/:accountId", requireAuth, fetchBudget);
router.post("/Upsert", requireAuth, createBudet);

export default router;
