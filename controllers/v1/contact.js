const contactModel = require("../../models/contact");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({}).lean();

  return res.json(contacts);
};

exports.create = async (req, res) => {
  const { name, email, phoneNumber, body } = req.body;

  const contact = await contactModel.create({
    name,
    email,
    phoneNumber,
    body,
    isAnswer: 0,
  });

  return res
    .status(201)
    .json({ message: "Contact message created successfully.", contact });
};

exports.answer = async (req, res) => {
  const { email, answer } = req.body;

  // Configure with environment variables
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "example@gmail.com",
      pass: process.env.EMAIL_PASS || "test pass",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || "example@gmail.com",
    to: email,
    subject: "Your answer from our company",
    text: answer,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return res.status(500).json({ message: "Failed to send email", error: error.message });
    } else {
      await contactModel.findOneAndUpdate(
        { email },
        { isAnswer: 1 }
      );
      return res.json({ message: "Email sent successfully." });
    }
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const remove = await contactModel.findByIdAndDelete(id);

  return res.json({ message: "Message removed successfully." });
};
