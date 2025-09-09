import express from "express"
import {  registerUser,  } from "../controller/userController.js";
import { requireAuth } from '@clerk/express'
const router = express.Router();

router.post("/register", registerUser);

export default router;

