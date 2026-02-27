const categoryModel = require("../../models/category");
const categoryValidation = require("../../validators/category");
const mongoose = require("mongoose");

exports.createCats = async (req, res) => {
  const validationResult = categoryValidation(req.body);
  if (!validationResult) {
    return res.status(422).json(validationResult);
  }

  const { title, href } = req.body;

  const category = await categoryModel.create({ title, href });

  return res
    .status(201)
    .json({ message: `category created succsessfully =>\n`, category });
};

exports.getAllCats = async (req, res) => {
  const category = await categoryModel.find({}).lean();
  
  return res.json({ category });
};

exports.rmCats = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);

  if (!isValidID) {
    return res.status(404).json({ message: "categoryID isnt valid!" });
  }

  const deleteCategory = await categoryModel.findOneAndDelete({ _id: id });

  return res.json({ message: "category deleted successfully" });
};

exports.updateCats = async (req, res) => {
  const isValidID = mongoose.isValidObjectId(req.params.id);
  console.log(isValidID);

  if (!isValidID) {
    return res.status(404).json({ message: "category isnt valid!" });
  }

  const validationResult = categoryValidation(req.body);

  if (!validationResult) {
    return res.status(422).json(validationResult);
  }

  const { title, href } = req.body;

  const updateCategory = await categoryModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      title,
      href,
    },
    { new: true }
  );

  if (!updateCategory) {
    return res.status(404).json({ message: "category not find!" });
  }

  return res.json({ message: "category updated seccussfully" });
};
