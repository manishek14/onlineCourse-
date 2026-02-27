const commentsModel = require("../../models/comment");
const coursesModel = require("../../models/course");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const comments = await commentsModel.find({})
    .populate("creator", "name username")
    .populate("course", "name")
    .lean();

  return res.json({ comments });
};

exports.createComment = async (req, res) => {
  const { body, courseHref } = req.body;

  const course = await coursesModel.findOne({ href: courseHref }).lean();

  if (!course) {
    return res.status(404).json({ message: "Course not found!" });
  }

  const comment = await commentsModel.create({
    body,
    course: course._id,
    creator: req.user.id,
    isAccept: 0,
    isAnswer: 0,
  });

  return res.status(201).json({ message: "Comment created successfully" });
};

exports.rmComment = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "Comment ID isn't valid" });
  }

  const remove = await commentsModel.findByIdAndDelete(id);
  if (!remove) {
    return res.status(404).json({ message: "Comment hasn't been found" });
  }

  return res.json({ message: "Comment removed successfully" });
};

exports.acceptComment = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid" });
  }

  const update = await commentsModel
    .findByIdAndUpdate(id, { isAccept: 1 }, { new: true })
    .lean();

  if (!update) {
    return res.status(404).json({ message: "Comment not found" });
  }

  return res.json({ message: "Comment accepted successfully." });
};

exports.answerComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  const isValidID = await commentsModel.findById(id).lean();
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  await commentsModel.findByIdAndUpdate(id, {
    isAnswer: 1,
    mainComment: id,
  });

  const createAnswer = await commentsModel.create({
    body,
    creator: req.user.id,
    course: isValidID.course,
    isAnswer: 1,
    isAccept: 1,
    mainComment: id,
  });

  return res.json({ message: "Comment answered successfully." });
};
