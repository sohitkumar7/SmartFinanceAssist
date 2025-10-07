import express from "express"
import { createAccount, getAccount, makeOneDefault } from "../controller/accountController.js";

const router = express.Router();

router.post("/create",createAccount);
router.get("/get/:UserId",getAccount);
router.put("/change/:accountId",makeOneDefault);
export default router;