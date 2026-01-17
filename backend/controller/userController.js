import User from "../models/user.js";

export const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.auth();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({
        clerkId: userId,
        name: "New User",
        email: "unknown",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};
