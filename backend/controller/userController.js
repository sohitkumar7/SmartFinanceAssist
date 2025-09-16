import User from "../models/user.js";
import { requireAuth } from "@clerk/express";

export const loginController = async (req, res) => {
  try {
    const authUserId = req.auth.userId; // Clerk userId from token
    const { clerkId } = req.params;

    // Prevent one user from fetching another user’s data
    if (authUserId !== clerkId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// ("/api/user/:clerkId", requireAuth()
