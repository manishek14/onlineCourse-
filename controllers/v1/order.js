const courseUserModel = require("../../models/courseUserRent");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user.id })
    .populate("course", "name href price")
    .lean();
  return res.json(orders);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const order = await courseUserModel
    .findById(id)
    .populate("course")
    .populate("user", "name email")
    .lean();
    
  if (!order) {
    return res.status(404).json({ message: "Order not found!" });
  }
    
  return res.json(order);
};
