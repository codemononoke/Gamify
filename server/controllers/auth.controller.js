const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        msg: "Please fill all the fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        msg: "Password and confirm password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists. Please sign to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      address: null,
      city: null,
      state: null,
      country: null,
      pinCode: null,
      phoneNumber: null,
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
      profileImage: null,
    });

    return res.status(200).json({
      success: true,
      user,
      msg: "User SignUp Successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "User is not able to signup. Please try again.",
      error: error,
    });
  }
});

const signin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields.",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User is not signup with us please signup to continue.",
      });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (comparedPassword) {
      const access_token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      (user.token = access_token), (user.password = undefined);

      return res
        .status(200)
        .cookie("access_token", access_token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          success: true,
          access_token,
          user,
          msg: "User SignIn Successfully.",
        });
    } else {
      return res.status(401).json({
        success: false,
        msg: "Password is incorrect.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "SignIn Failure. Please try again.",
      error: error,
    });
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    return res.status(200).cookie("access_token", null).json({
      success: true,
      msg: "User logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Logout Failure. Please try again.",
      error: error,
    });
  }
});

module.exports = { signup, signin, logout };
