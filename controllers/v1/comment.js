const commentsModel = require("../../models/comment");
const coursesModel = require("../../models/course");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const comments = await commentsModel.find({}).lean();

  return res.json({ comments });
};

exports.createComment = async (req, res) => {
  const { body, courseHref } = req.body;

  const course = await coursesModel.findOne({ href: courseHref }).lean();

  const comment = await commentsModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    isAccept: 0,
    isAnswer: 0,
  });

  return res.status(201).json({ message: "comment created successfully" });
};

exports.rmComment = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "courseID isnt valid" });
  }

  const remove = await commentsModel.findOneAndDelete({ _id: id });
  if (!remove) {
    return res.status(404).json({ message: "comment hanst found" });
  }

  return res.json(remove);
};

exports.acceptComment = async (req, res) => {
  const { id } = req.params;
  const { isAccept } = req.body;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid" });
  }

  const update = await commentsModel
    .findOneAndUpdate({ _id: id }, { $set: { isAccept } }, { new: true })
    .lean();

  return res.json({ message: "comment accepted successfully." });
};

exports.answerComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  const isValidID = await commentsModel.findOne({ _id: id }).lean();
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const updated = await commentsModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { isAnswer: 1 },
      $set: { mainComment: id },
    },
    { new: true }
  );

  const createAnswer = await commentsModel.create({
    body,
    creator: req.user._id,
    course: updated.course,
    isAnswer: 1,
    isAccept: 1,
  });

  return res.json({ message: "comment answered successfully." });
};
