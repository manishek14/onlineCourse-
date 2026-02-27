const ticketModel = require("../../models/ticket");
const departmentModel = require("../../models/department");
const departmentSubModel = require("../../models/departmentSub");

exports.getAll = async (req, res) => {
  const tickets = ticketModel
    .find({ answer: 0 })
    .populate("departmentID", "title")
    .populate("departmentSubID", "title")
    .populate("creator", "name")
    .lean();

  return res.json(tickets);
};

exports.create = async (req, res) => {
  const { departmentID, departmentSubID, title, body, priority } = req.body;

  const isValidDepartmentID = await departmentModel.find({
    _id: departmentID,
  });

  const isValidDepartmentSubID = await departmentSubModel.find({
    _id: departmentSubID,
  });

  if (!isValidDepartmentID) {
    return res.status(409).json({ message: "departmentID isnt valid!" });
  } else if (!isValidDepartmentSubID) {
    return res.status(409).json({ message: "departmentSubID isnt valid!" });
  }

  const Ticket = await ticketModel.create({
    title,
    body,
    departmentID,
    departmentSubID,
    answer: 0,
    creator: req.user._id,
    priority,
    isAnswer: 0,
  });

  const mainTicket = await ticketModel
    .findOne({ _id: Ticket._id })
    .populate("departmentID")
    .populate("departmentSubID")
    .populate("creator")
    .lean();
  return res.status(201).json({ message: "ticket sent successfully." });
};

exports.userTickets = async (req, res) => {
  const tickets = ticketModel
    .find({ creator: req.user._id })
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
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const remove = await ticketModel.findOneAndDelete({ _id: id });
  return res.json({ message: "ticket has removed successfully." });
};

exports.department = async (req, res) => {
  const department = await departmentModel.find({}).lean();

  return res.json(department);
};

exports.departmentSub = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const departmentSubs = await departmentSubModel.find({ parent: id }).lean();
  return res.json(departmentSubs);
};

exports.setAnswer = async (req, res) => {
  const { body, ticketID } = req.body;

  const ticket = await ticketModel.find({ _id: ticketID });
  if (!ticket) {
    return res.status(409).json({ message: "ticketID isnt valid!" });
  }

  const answer = await ticketModel.create({
    title: "your ticket answer.",
    body,
    parent: ticketID,
    priority: ticket.priority,
    creator: req.user._id,
    isAnswer: 1,
    answer: 0,
    departmentID: ticket.departmentID,
    departmentSubID: ticket.departmentSubID,
  });

  await ticketModel.findOneAndUpdate({ _id: ticketID }, { answer: 1 });

  return res.status(201).json(answer);
};

exports.getAnswer = async (req, res) => {
  const { id } = req.params;
  
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const ticket = await ticketModel.findOne({ _id: id });
  const ticketAnswer = await ticketModel.findOne({ parent: id });

  return res.json(ticket, ticketAnswer ? ticketAnswer : null);
};
