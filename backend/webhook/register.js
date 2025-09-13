import { Webhook } from "svix";
import User from "../models/user.js"
const webhookSecret = process.env.WEBHOOK_SECRET;

app.post("/api/webhooks/register", express.json({ type: "application/json" }), async (req, res) => {
  
  const payload = req.body;
  const headers = req.headers;

  try {
    const wh = new Webhook(webhookSecret);
    wh.verify(JSON.stringify(payload), headers); // ✅ verify signature

    const { id, email_addresses, first_name, last_name } = payload.data;

    let user = await User.findOne({ clerkId: id });
    if (!user) {
      user = new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
      });
      await user.save();
    }

    res.status(200).json({ message: "User synced with MongoDB" });
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    res.status(400).json({ error: "Invalid webhook" });
  }
});
