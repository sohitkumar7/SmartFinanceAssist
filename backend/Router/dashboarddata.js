import { dashboarddata } from "../controller/dashboardcontroller.js";
import express from "express";

const router = express.Router();

router.get("/getdata/:userId",dashboarddata);

export default router;