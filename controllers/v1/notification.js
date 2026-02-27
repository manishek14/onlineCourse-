const notificationModel = require("../../models/notification");
const userModel = require("../../models/user");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  const { message, admin } = req.body;

  const isAdmin = await userModel.findById(admin);
  if (!isAdmin) {
    return res
      .status(401)
      .json({ message: "You aren't accessible to this route!" });
  }

  const createNotification = await notificationModel.create({ message, admin });
  return res.json({ createNotification });
};

exports.getAdmin = async (req, res) => {
  const { id } = req.user;
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const adminnotification = await notificationModel.find({ admin: id });
  return res.json({ adminnotification });
};

exports.getAll = async (req, res) => {
  const notification = await notificationModel.find({});

  return res.json({ notification });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const remove = await notificationModel.findByIdAndDelete(id);

  return res.json({ message: "Notification removed successfully." });
};

exports.seen = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const notification = await notificationModel.findByIdAndUpdate(
    id,
    { seen: 1 },
    { new: true }
  );

  return res.json({ notification });
};
