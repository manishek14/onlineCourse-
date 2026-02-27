const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Courses",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("CourseUserRents", schema);

module.exports = model;
