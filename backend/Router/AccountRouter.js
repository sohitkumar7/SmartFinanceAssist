import express from "express"
import { createAccount, getAccount } from "../controller/accountController.js";

const router = express.Router();

router.post("/create",createAccount);
router.get("/get/:UserId",getAccount);

export default router;