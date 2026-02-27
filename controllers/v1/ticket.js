const ticketModel = require("../../models/ticket");
const departmentModel = require("../../models/department");
const departmentSubModel = require("../../models/departmentSub");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const tickets = await ticketModel
    .find({ answer: 0 })
    .populate("departmentID", "title")
    .populate("departmentSubID", "title")
    .populate("creator", "name")
    .lean();

  return res.json(tickets);
};

exports.create = async (req, res) => {
  const { departmentID, departmentSubID, title, body, priority } = req.body;

  const isValidDepartmentID = await departmentModel.findById(departmentID);

  const isValidDepartmentSubID = await departmentSubModel.findById(departmentSubID);

  if (!isValidDepartmentID) {
    return res.status(409).json({ message: "departmentID isn't valid!" });
  } else if (!isValidDepartmentSubID) {
    return res.status(409).json({ message: "departmentSubID isn't valid!" });
  }

  const Ticket = await ticketModel.create({
    title,
    body,
    departmentID,
    departmentSubID,
    answer: 0,
    creator: req.user.id,
    priority,
    isAnswer: 0,
  });

  const mainTicket = await ticketModel
    .findById(Ticket._id)
    .populate("departmentID")
    .populate("departmentSubID")
    .populate("creator")
    .lean();
  return res.status(201).json({ message: "Ticket sent successfully." });
};

exports.userTickets = async (req, res) => {
  const tickets = await ticketModel
    .find({ creator: req.user.id })
    .sort({ _id: -1 })
    .populate("departmentID", "title")
    .populate("departmentSubID", "title")
    .populate("creator", "name")
    .lean();

  return res.json(tickets);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const remove = await ticketModel.findByIdAndDelete(id);
  return res.json({ message: "Ticket has been removed successfully." });
};

exports.department = async (req, res) => {
  const department = await departmentModel.find({}).lean();

  return res.json(department);
};

exports.departmentSub = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const departmentSubs = await departmentSubModel.find({ parent: id }).lean();
  return res.json(departmentSubs);
};

exports.setAnswer = async (req, res) => {
  const { body, ticketID } = req.body;

  const ticket = await ticketModel.findById(ticketID);
  if (!ticket) {
    return res.status(409).json({ message: "ticketID isn't valid!" });
  }

  const answer = await ticketModel.create({
    title: "Your ticket answer.",
    body,
    parent: ticketID,
    priority: ticket.priority,
    creator: req.user.id,
    isAnswer: 1,
    answer: 0,
    departmentID: ticket.departmentID,
    departmentSubID: ticket.departmentSubID,
  });

  await ticketModel.findByIdAndUpdate(ticketID, { answer: 1 });

  return res.status(201).json(answer);
};

exports.getAnswer = async (req, res) => {
  const { id } = req.params;
  
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isn't valid!" });
  }

  const ticket = await ticketModel.findById(id);
  const ticketAnswer = await ticketModel.findOne({ parent: id });

  return res.json({ ticket, ticketAnswer: ticketAnswer || null });
};
