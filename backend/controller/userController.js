  import User from "../models/user.js";
  import { requireAuth } from "@clerk/express";

  export const loginController = async (req, res) => {
    try {
      const authUserId = req.auth.userId; // Clerk userId from token
      const { clerkId } = req.body;

      // Prevent one user from fetching another user’s data
      if (authUserId !== clerkId) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      const user = await User.findOne({ clerkId });
      if (!user){

        return res
        .status(404)
        .json({ success: false, message: "User not found" });
      }
        
        console.log(user);

      res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  };
