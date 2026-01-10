import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import User from "./models/user.js";
import { Webhook } from "svix";
import userRoutes from "./Router/userRouter.js"
import accoutroutes from "./Router/AccountRouter.js"
import transactionRoute from "./Router/transactionRoute.js"
import BudgetRouter from "./Router/bugetRouter.js";
import aiTransactionRoutes from "./Router/geminiapi.js"
import dashboardrouter from "./Router/dashboarddata.js";

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on connection failure
  });

// Note: You must check for the secret before using it
const webhookSecret = process.env.WEBHOOK_SECRET;
if (!webhookSecret) {
  throw new Error('You must provide a WEBHOOK_SECRET in your .env file.');
}

app.post(
  "/api/webhooks/register",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // Check for a raw body. If express.raw() failed, this will be missing.
    if (!req.body) {
      return res.status(400).json({ error: "No raw body found. Ensure webhook is configured correctly." });
    }

    const payload = req.body;
    const headers = req.headers;
    let evt;

    try {
      const wh = new Webhook(webhookSecret);
      // The verify method takes the raw payload buffer and the headers
      evt = wh.verify(payload, headers);
    } catch (err) {
      console.error("Webhook verification failed:", err.message);
      return res.status(400).json({ error: "Invalid webhook signature or payload." });
    }

    console.log("✅ Webhook verified successfully.");

    const { type, data } = evt;

    try {
      // Handle the event types
      switch (type) {
        case "user.created": {
          const { id, email_addresses, first_name, last_name } = data;
           const email = email_addresses[0]?.email_address;
           console.log(email);
          let user = await User.findOne({ email });
          if (!user) {
            user = new User({
              clerkId: id,
              email: email_addresses[0].email_address,
              name: `${first_name} ${last_name}`,
            });
            await user.save();
            console.log(" New user saved to MongoDB:", user.clerkId);
          }
          else{
            console.log("❕ User with this email already exists:", email);
            return res.status(200).json({ success: true, message: "User already exists with this email." });
          }
          break;
        }
        case "user.deleted": {
          await User.deleteOne({ clerkId: data.id });
          console.log(" User deleted from MongoDB:", data.id);
          break;
        }
        default:
          console.log(`❕ Unhandled event type: ${type}`);
          break;
      }

      res.status(200).json({ message: "User synced with MongoDB" });
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Standard JSON middleware for other routes (if any)
app.use(express.json());
// app.use("/api/user",loginRoute)
app.use("/api/transaction",transactionRoute)
app.use("/api/user", userRoutes);
app.use("/api/account",accoutroutes);
app.use("/api/Budget",BudgetRouter)
app.use("/api",aiTransactionRoutes)
app.use("/api/data",dashboardrouter);
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));