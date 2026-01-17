import { dashboarddata } from "../controller/dashboardcontroller.js";
import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/getdata", requireAuth, dashboarddata);

export default router;
