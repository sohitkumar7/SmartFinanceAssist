import express from "express";
import { fetchBudget, createBudet } from "../controller/budger.controller.js";

const router = express.Router();

router.get("/fetchBudget/:AccountId", fetchBudget);
router.post("/Upsert", createBudet);

export default router;
