import generatetoken from "../JWT/generateToken.js";
import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {
    
    const { email, name } = req.body;

    // Check if already exists
    let existingUser = await User.findOne({email});
    if (existingUser) {
      return res.json({
        succes:false,
        message:"user Already Exist"
      });
    }

    // Create new user
    const newUser = await User.create({
      email,
      name,
    });

    generatetoken(newUser._id,res);

    res.status(201).json({
      message:"User Created SuccessFully",
      success:true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};
