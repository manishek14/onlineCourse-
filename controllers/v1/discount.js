const discountModel = require("../../models/discount");
const courseModel = require("../../models/course");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const discounts = await discountModel
    .find({}, "-__v")
    .populate("creator", "name href")
    .populate("course", "name")
    .lean();

  return res.json(discounts);
};

exports.create = async (req, res) => {
  const { code, percent, course, max } = req.body;

  const create = await discountModel.create({
    code,
    percent,
    course,
    max,
    uses: 0,
    creator: req.user._id,
  });

  return res
    .status(201)
    .json({ message: "discount code created successfully." });
};

exports.setOnAll = async (req, res) => {
  const { discount } = req.body;

  const courseDiscounts = await courseModel.updateMany({ discount });

  return res.json({ discount });
};

exports.getOne = async (req, res) => {
  const { code } = req.params;
  const { course } = req.body;

  const isValidCourseId = mongoose.Types.ObjectId.isValid(course);
  if (!isValidCourseId) {
    return res.json({ message: "Course ID is not valid!" });
  }

  const discount = await discountModel.findOne({ code, course });

  if (!discount) {
    return res.status(404).json({ message: "Code is not valid!" });
  } else if (discount.max === discount.uses) {
    return res.status(409).json({ message: "This code already used!" });
  } else {
    await discountModel.findOneAndUpdate(
      {
        code,
        course,
      },
      {
        uses: discount.uses + 1,
      }
    );
    return res.json(discount);
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const remove = await discountModel.findOneAndRemove({ _id: id });

  return res.json({ message: "discount code removed successfully." });
};
