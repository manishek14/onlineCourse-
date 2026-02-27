const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    departmentID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    departmentSubID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "tickets",
    },
    isAnswer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("tickets", schema);
module.exports = model;
