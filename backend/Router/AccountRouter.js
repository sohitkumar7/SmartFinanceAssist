import express from "express"
import { createAccount, deleteAccount, getAccount, makeOneDefault } from "../controller/accountController.js";

const router = express.Router();

router.post("/create",createAccount);
router.get("/get/:UserId",getAccount);
router.put("/change/:accountId",makeOneDefault);
router.delete("/delete/:accountId", deleteAccount);
export default router;