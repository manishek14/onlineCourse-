const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/courseOnline";
    await connect(mongoUrl);
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;