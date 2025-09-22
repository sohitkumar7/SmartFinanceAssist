import express from "express";
import { getCurrentUser } from "../controller/userController.js";
import { clerkMiddleware } from '@clerk/express';
const router = express.Router();

// This route now matches the fetchCurrentUser thunk in your Redux slice.
// It is a GET request and uses the correct path.
router.get("/me", clerkMiddleware(), getCurrentUser);

export default router;
