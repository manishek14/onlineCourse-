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
    .json({ message: "user created successfully.", contact });
};

exports.answer = async (req, res) => {
  const { email, answer } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "example@gamil.com",
      pass: "tset pass",
    },
  });

  const mailOptions = {
    from: "example@gamil.com",
    to: email,
    subject: "your answer from our company",
    text: answer,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.json({ message: error });
    } else {
      const contact = await contactModel.findOneAndUpdate(
        { email },
        { answer: 1 }
      );
    }
    return res.json({ message: "email sent successfully." });
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const remove = await contactModel.findOneAndRemove({ _id: id });

  return res.json({ message: "message removed successfully." });
};
