import express from "express"
import { loginController, SignupController } from "../controller/userController";

const router = express.Router();

router.post("/login",loginController);
router.post("/signup",SignupController);

