import User from "../models/user.js";
import { requireAuth } from "@clerk/express";

export const getCurrentUser = async (req, res) => {
  try {
    // The authenticated user's ID is securely provided by the Clerk middleware
    const clerkId = req.auth.userId;

    if (!clerkId) {
      // This case should not be reached if the middleware is working
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find the user in your database using the Clerk ID
    const user = await User.findOne({ clerkId: clerkId });

    if (!user) {
      // This handles the case where the user is authenticated with Clerk
      // but hasn't been saved to your database yet.
      return res
        .status(404)
        .json({ success: false, message: "User not found in database" });
    }

    // If the user is found, send their data back to the frontend
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user data" });
  }
};
