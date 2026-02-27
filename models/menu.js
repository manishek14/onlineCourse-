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
    parentID: {
      type: mongoose.Types.ObjectId,
      ref: "menus",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("menus", schema);

module.exports = model;
