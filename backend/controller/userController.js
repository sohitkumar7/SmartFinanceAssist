import User from "../models/user.js";

export const getCurrentUser = async (req, res) => {
  try {
    // Access the auth context as a function to get the userId.
    const { userId } = req.auth();

    // This check is good practice, although the middleware should handle it.
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find the user in your database using the secure Clerk ID.
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in database" });
    }

    console.log(user);

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

