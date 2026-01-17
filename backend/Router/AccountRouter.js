import express from "express"
import { requireAuth } from "@clerk/express";
import { createAccount, deleteAccount, getAccount, makeOneDefault } from "../controller/accountController.js";

const router = express.Router();

router.post("/create", requireAuth(), createAccount);
router.get("/get", requireAuth(), getAccount);
router.put("/change/:accountId", requireAuth(), makeOneDefault);
router.delete("/delete/:accountId", requireAuth(), deleteAccount);
export default router;
