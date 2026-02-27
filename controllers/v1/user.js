const banedUserModel = require("../../models/banUser");
const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.ban = async (req, res) => {
    const { id } = req.params;

    const mainUser = await userModel.findOne({ _id: id }).lean();
    if (!mainUser) {
        return res.status(404).json({ message: "User not found!" });
    }

    const banUserResult = await banedUserModel.create({ phoneNumber: mainUser.phoneNumber });

    if (banUserResult) {
        return res.status(201).json({ message: "User has been banned successfully." });
    }

    return res.status(500).json({ message: "Internal Server Error!" });
};

exports.changeRole = async (req, res) => {
    const { id } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    const user = await userModel.findOne({ _id: id });

    if (!isValidID) {
        return res.status(409).json({ message: "userId isn't valid!" });
    } else if (!user) {
        return res.status(404).json({ message: "userID doesn't exist in DB!" });
    }

    let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    const updatedUser = await userModel.findByIdAndUpdate(
        { _id: id },
        { role: newRole },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(500).json({ message: "An error occurred while updating the user's role!" });
    }
    return res.json({ message: "User role changed successfully." });
};

exports.rmUser = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) {
        return res.status(409).json({ message: "userId isn't valid!" });
    }

    const removeUser = await userModel.findByIdAndDelete({ _id: id });

    if (!removeUser) {
        return res.status(404).json({ message: "There isn't any user with this data!" });
    }

    return res.json({ message: "User removed successfully." });
};

exports.updateData = async (req, res) => {
    const { username, name, email, password, phoneNumber } = req.body;

    const updateData = {
        username,
        name,
        email,
        phoneNumber
    };

    if (password) {
        const hashedPass = await bcrypt.hash(password, 12);
        updateData.password = hashedPass;
    }

    const user = await userModel.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
    ).select("-password").lean();

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    return res.json(user);
};

exports.getAll = async (req, res) => {
    const users = await userModel.find({}).select("-password -refreshToken").lean();

    return res.json(users);
};

