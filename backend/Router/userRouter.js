import express from "express";
import { loginController } from "../controller/userController.js";
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.get("/user/:clerkId", requireAuth(), loginController);
export default router;
