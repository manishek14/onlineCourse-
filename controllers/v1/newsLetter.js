const newsLetterModel = require("../../models");
const validator = require("validator");

exports.getAll = async (req, res) => {
  const emails = await newsLetterModel.find({}).lean();

  return res.json(emails);
};

exports.create = async (req, res) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  const result = await newsLetterModel
    .find({ email: { $regex: /[^\t\r\n]+@[^@\t\r\n]+\.[^@\t\r\n]/g } })
    .toArray();

  if (result.length > 0) {
    return res.status(409).json({ message: "Email already exists!" });
  }

  const newEmail = await newsLetterModel.create({ email });

  return res.status(201).json({ message: "Email added successfully." });
};
