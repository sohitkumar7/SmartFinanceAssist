import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { userId } = req.auth; // Clerk verified userId
    const { email, name } = req.body;

    // Check if already exists
    let existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Create new user
    const newUser = new User({
      clerkId: userId,
      email,
      name,
    });

    await newUser.save();
    res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};
