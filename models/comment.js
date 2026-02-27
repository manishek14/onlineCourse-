const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isAccept: {
      type: Number,
      required: true,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    mainComment: {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("comments", schema);
module.exports = model;
