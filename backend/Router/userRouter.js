import express from "express"
import {  loginConstroller } from "../controller/userController.js";
import { requireAuth } from '@clerk/express'
const router = express.Router();

router.post("/login", requireAuth(),loginConstroller);

export default router;

