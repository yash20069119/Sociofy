const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
 
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({limit: "10mb"}));


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(err));

const JWT_SECRET = process.env.JWT_SECRET;

app.use("/api/posts", postRoutes);

// Registrating user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  Verify User
app.get("/profile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

// LOGOUT
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

app.listen(process.env.PORT, () => {
  console.log(` Server is running on port ${process.env.PORT}`);
});
