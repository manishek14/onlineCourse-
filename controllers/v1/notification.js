const notificationModel = require("../../models/notification");
const userModel = require("../../models/user");

exports.create = async (req, res) => {
  const { message, admin } = req.body;

  const isAdmin = await userModel.find({ _id: admin });
  if (!admin) {
    return res
      .status(401)
      .json({ message: "you arent accessable to this route!" });
  }

  const createNotification = await notificationModel.create({ message, admin });
  return res.json({ createNotification });
};

exports.getAdmin = async (req, res) => {
  const { _id } = req.user;
  const isValidID = mongoose.Types.ObjectId.isValid(_id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const adminnotification = await notificationModel.find({ admin: _id });
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
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const remove = await notificationModel.findOneAndRemove({ _id: id });

  return res.json({ message: "notification removed successfully." });
};

exports.seen = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const notification = await notificationModel.findOneAndUpdate(
    { _id: id },
    { seen: 1 }
  );

  return res.json({ notification });
};
