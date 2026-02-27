const courseUserModel = require("../../models/courseUserRent");

exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user._id })
    .populate("course", "name href")
    .lean();
  return res.json(orders);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const order = await courseUserModel
    .findOne({ _id: id })
    .populate("course")
    .lean();
    
  return res.json(order);
};
