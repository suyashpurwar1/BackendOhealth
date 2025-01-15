import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import jwt from "jsonwebtoken";
const { sign } = jwt;
import User from "./../model/User.js";



export async function register(req, res) {
  try {
    const { panNumber, name, password, email, mobile, address, dob } = req.body;

    // Validate input
    if (!panNumber || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if PAN already exists
    const existingUser = await User.findOne({ panNumber });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This PAN number is already registered" });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);


    // Create new user
    const user = new User({
      panNumber,
      name,
      password: hashedPassword,
      email,
      mobile,
      address,
      dob,
    });

    await user.save();

    res
      .status(201)
      .json({ message: "Registration successful! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export async function login(req, res) {
  try {
    console.log("Login Attemped", req.body);
    const { panNumber, password } = req.body;

    // Validate input
    if (!panNumber || !password) {
      return res
        .status(400)
        .json({ message: "PAN number and password are required" });
    }

    // Find user by PAN number
    const user = await User.findOne({ panNumber });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = sign(
      { userId: user._id, panNumber: user.panNumber },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        panNumber: user.panNumber,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
