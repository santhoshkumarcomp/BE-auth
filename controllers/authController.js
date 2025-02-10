const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User registered");
    } catch (error) {
      res.send(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send(token);
    } catch (error) {
      res.send(error.message);
    }
  },
  logout: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      // set the token to an empty string
      const token = "";

      res.json({ message: "User logged out", token: token });
    } catch (error) {
      res.send(error.message);
    }
  },
  me: async (req, res) => {
    try {
      const { userId } = req;
      const user = await User.findById(userId).select("-password -__v");
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user);
    } catch (error) {
      res.send(error.message);
    }
  },
};

module.exports = authController;
