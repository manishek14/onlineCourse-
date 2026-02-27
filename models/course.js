const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String || Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

schema.virtual("session", {
  ref: "sessions",
  localField: "_id",
  foreignField: "courses",
});

const model = mongoose.model("Courses", schema);

module.exports = model;
