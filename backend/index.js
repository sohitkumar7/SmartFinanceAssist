import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import User from "./models/user.js";
import { Webhook } from "svix";

dotenv.config({ quiet: true });
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());

// Capture raw body as Buffer
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const webhookSecret = process.env.WEBHOOK_SECRET;

app.post("/api/webhooks/register", async (req, res) => {
  const headers = req.headers;
  const payloadBuffer = req.rawBody; // Keep as Buffer

  console.log("Signature:", headers['svix-signature']);
  console.log("Timestamp:", headers['svix-timestamp']);
  console.log("Raw body length:", payloadBuffer.length);

  try {
    const wh = new Webhook(webhookSecret);

    // Pass Buffer directly, do NOT convert to string
    wh.verify(payloadBuffer, headers['svix-signature'], headers['svix-timestamp']);

    // Parse JSON only AFTER verification
    const parsed = JSON.parse(payloadBuffer.toString('utf-8'));
    const { type, data } = parsed;

    if (type === "user.created") {
      const { id, email_addresses, first_name, last_name } = data;
      let user = await User.findOne({ clerkId: id });
      if (!user) {
        user = new User({
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
        });
        await user.save();
      }
    } else if (type === "user.deleted") {
      await User.deleteOne({ clerkId: data.id });
    }

    res.status(200).json({ message: "User synced with MongoDB" });
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    res.status(400).json({ error: "Invalid webhook" });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
