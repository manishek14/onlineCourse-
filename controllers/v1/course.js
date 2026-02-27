const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const categoryModel = require("../../models/category");
const courseUserModel = require("../../models/courseUserRent");
const commentModel = require("../../models/comment");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  if (!req.files.cover || req.files.cover.length === 0) {
    return res.status(400).json({ error: "Cover file is required" });
  }

  const {
    name,
    description,
    href,
    price,
    status,
    discount,
    categoryID,
    creator,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    href,
    price,
    status,
    discount,
    categoryID,
    creator: req.user._id,
    cover: req.files.cover[0].filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};

exports.getAlls = async (req, res) => {
  try {
    const courses = await courseUserModel
      .find({})
      .populate("user")
      .populate("course")
      .lean();

    const registers = await courseUserModel.find({}).lean();
    const comments = await commentModel.find({}).lean();

    const allCourses = courses.map((course) => {
      const courseRegisters = registers.filter(
        (register) => register.course.toString() === course._id.toString()
      ).length;

      const courseComments = comments.filter(
        (comment) => comment.course.toString() === course._id.toString()
      ).length;

      return {
        ...course,
        categoryID: course.categoryID.title,
        creator: course.user.name,
        registers: courseRegisters,
        comments: courseComments,
      };
    });

    return res.json(allCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
};

exports.createSession = async (req, res) => {
  if (!req.files.video || req.files.video.length === 0) {
    return res.status(400).json({ error: "Video file is required" });
  }

  const { title, time, free } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: req.files.video[0].filename,
    course: id,
  });

  return res.status(201).json({ session });
};

exports.getSessions = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const sessions = await sessionModel.find({ course: id });

  return res.json({ sessions });
};

exports.getAllSessionInfo = async (req, res) => {
  const { href, sessionID } = req.params;
  const course = await courseModel.findOne({ href }).lean();

  if (!course) {
    return res.status(404).json({ message: "Course not found!" });
  }

  const isValidSessionID = await sessionModel.findOne({ _id: sessionID });

  if (!isValidSessionID) {
    return res.status(409).json({ message: "sessionID isnt valid!" });
  }

  const session = await sessionModel.findOne({ title: sessionID });

  const sessions = await sessionModel.find({ course: course._id });

  return res.json({ session, sessions });
};

exports.rmSession = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const isSession = await sessionModel.find({ _id: id }).lean();

  if (isSession) {
    const deleteSession = await sessionModel.findOneAndDelete({ _id: id });
    return res.json({ message: "the session removed successfully." });
  } else {
    return res.status(404).json({ message: "this id isnt valid!" });
  }
};

exports.getCourses = async (req, res) => {
  const { href } = req.params;
  const category = await categoryModel.findOne({ href });

  if (category) {
    const categoryCourses = await courseModel.find({
      categoryID: category._id,
    });

    return res.json(categoryCourses);
  } else {
    return res.status(404).json({ message: "category not found" });
  }
};

exports.register = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const isUserRegisterd = await courseUserModel
    .findOne({
      course: id,
      user: req.user._id,
    })
    .lean();

  if (isUserRegisterd) {
    return res.status(409).json({ message: "this user alredy registerd!" });
  }

  const register = await courseUserModel.create({
    user: req.user._id,
    course: id,
    price,
  });

  return res.status(201).json({ message: "you`re registerd on this course." });
};

exports.getDetails = async (req, res) => {
  const { href } = req.params;

  const course = await courseModel
    .findOne({
      href,
    })
    .populate("creator", "-password")
    .populate("categoryID");

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const session = await sessionModel.find({ course: course._id }).lean();

  const comment = await commentModel
    .find({ course: course._id, isAccept: 1 })
    .populate("creator", "-password");

  const courseStudentCount = await courseUserModel.countDocuments({
    course: course._id,
  });

  const isUserRegisterdInThisCourse = !!(await courseUserModel.findOne({
    user: req.user._id,
    course: course._id,
  }));

  res.json({
    course,
    session,
    comment,
    courseStudentCount,
    isUserRegisterdInThisCourse,
  });
};

exports.rmCourse = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "courseID isnt valid!" });
  }

  const deleteCourse = await courseModel.findOneAndDelete({
    _id: id,
  });

  return res.json(deleteCourse);
};

exports.relatedCourses = async (req, res) => {
  const { href } = req.params;

  const course = await courseModel.find({ href });

  if (!course) {
    return res.json({ message: "course not found!" });
  }

  let realetedCourse = await courseModel.find({
    categoryID: course.categoryID,
  });
  realetedCourse = realetedCourse.filter((course) => {
    course.href != href;
  });

  return res.json(realetedCourse);
};

exports.getStatus = async (req, res) => {
  const courses = await courseModel.find({ status: "OnProgess" });

  res.status(200).json({ courses });
};
