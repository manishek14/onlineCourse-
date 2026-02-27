const userModel = require("../../models/user");
const otpModel = require("../../models/otp");
const registerValidator = require("../../validators/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const { generateAccessToken, generateRefreshToken } = require("../../utils/auth");
const { Smsir } = require("smsir-js");
const axios = require("axios");
require("dotenv").config(path.join("../.env"));

exports.register = async (req, res) => {
  try {
    const validationResult = await registerValidator(req.body);
    if (validationResult != true) {
      return res.status(422).json(validationResult);
    }

    const { username, name, email, phoneNumber, password } = req.body;

    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (isUserExists) {
      return res
        .status(409)
        .json({ message: "userName, email, or phoneNumber is duplicated" });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const countOfUsers = await userModel.countDocuments();

    const user = await userModel.create({
      username,
      name,
      email,
      phoneNumber,
      password: hashedPass,
      role: countOfUsers > 0 ? "USER" : "ADMIN",
    });

    const userOBJ = user.toObject();
    Reflect.deleteProperty(userOBJ, "password");

    const accessToken = generateAccessToken(user.email);
    const refreshToken = generateRefreshToken(user.email);

    await userModel.findByIdAndUpdate(
      user._id,
      { $set: { refreshToken } },
      { new: true }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({ 
      message: "User registered successfully",
      user: userOBJ 
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifire, password } = req.body;

    if (!identifire || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required!" });
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let queryField = {};

    if (emailFormat.test(identifire)) {
      queryField = { email: identifire };
    } else {
      queryField = { username: identifire };
    }

    const user = await userModel.findOne(queryField);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const accessToken = generateAccessToken(user.email);
    const refreshToken = generateRefreshToken(user.email);

    await userModel.findByIdAndUpdate(
      user._id,
      { $set: { refreshToken } },
      { new: true }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token required!" });
    }

    const accessToken = authHeader.split(" ")[1];

    const verifyToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    const userData = await userModel.findOne({ email: verifyToken.email })
      .select("-password -refreshToken");

    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.json({ user: userData });
  } catch (error) {
    console.error("GetMe error:", error);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    
    if (refreshToken) {
      await userModel.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token not found!" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const user = await userModel.findOne({ 
      email: decoded.email,
      refreshToken: refreshToken 
    });
    
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token!" });
    }

    const newAccessToken = generateAccessToken(user.email);
    
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    
    return res.json({ 
      message: "Token refreshed successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(401).json({
      message: "Invalid or expired refresh token!",
    });
  }
};

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required!" });
  }

  const code = Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const expireAt = now.getTime() + 5 * 60 * 1000;

  try {
    const data = {
      mobile: phone,
      templateId: "314002",
      parameters: [{ name: "CODE", value: code.toString() }],
    };

    const response = await axios.post(
      "https://api.sms.ir/v1/send/verify",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
          "x-api-key": process.env.SMS_IR_API_KEY_TEST,
        },
      }
    );

    if (response.status !== 1) {
      console.log("SMS error:", response.data);
      return res
        .status(500)
        .json({ message: response?.data.message || "Failed to send OTP" });
    }

    await otpModel.create({
      phone,
      code,
      expireAt,
    });

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error.response?.data || error);
    return res.status(500).json({ message: "Failed to send SMS" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;

  if (!code || !phone) {
    return res.status(400).json({ message: "Phone and code are required" });
  }

  const OTP = await otpModel.findOne({ phone }).sort({ _id: -1 });

  if (!OTP) {
    return res.status(404).json({ message: "No OTP found for this phone" });
  }

  const now = Date.now();

  if (OTP.expireAt < now) {
    return res.status(410).json({ message: "Code has expired!" });
  }

  if (OTP.uses >= 5) {
    return res
      .status(429)
      .json({ message: "Code has reached its maximum usage!" });
  }

  if (String(OTP.code) !== String(code)) {
    await otpModel.updateOne({ _id: OTP._id }, { $inc: { uses: 1 } });
    return res.status(401).json({ message: "Invalid code!" });
  }
  
  await otpModel.deleteOne({ _id: OTP._id });
  return res.status(200).json({ message: "Code verified successfully" });
};
