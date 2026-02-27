const { connect } = require("mongoose")

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/courseOnline");
    console.log("Connected to myDB.");
  } catch (err) {
    console.error(err);
    // process.exit(1);
  }
}

module.exports = connectDB;