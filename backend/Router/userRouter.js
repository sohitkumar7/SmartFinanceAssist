import express from "express"
import {  registerUser,  } from "../controller/userController.js";
import  requireAuth  from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", requireAuth(), registerUser);

export default router;

