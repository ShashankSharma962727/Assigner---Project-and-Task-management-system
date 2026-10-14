const { trusted } = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {genrateAccessToken, genrateRefreshToken} = require("../utils/genrateJwtToken");
const hashPass = require("../utils/hashPass");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Field are required!",
      });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User Already registered! Please login.",
      });
    }

    const hashedPass = await hashPass(password);

    const user = await User.create({
      username,
      email,
      password: hashedPass,
    });

    return res.status(201).json({
      success: true,
      message: "User Created!",
      userid: user._id,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered!",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.errmsg,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Field are required!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please register.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password! Please try again.",
      });
    }

    const accessToken = genrateAccessToken(
      user._id,
      user.username,
      user.email,
      "15m",
    );
    const refreshToken = genrateRefreshToken(
      user._id,
      user.username,
      user.email,
      "7d",
    );

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: trusted
    });

    return res.status(200).json({
      success: false,
      message: "Login Successfully!",
      accessToken
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
