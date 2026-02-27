const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    publish: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("articles", schema);

module.exports = model;
