import express from "express";
import { getCurrentUser } from "../controller/userController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", requireAuth, getCurrentUser);

export default router;
