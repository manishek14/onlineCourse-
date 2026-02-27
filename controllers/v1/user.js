const banedUserModel = require("../../models/banUser")
const userModel = require("../../models/user")

const bcrypt  = require("bcrypt")
const { isValidObjectID } = require("mongoose")

exports.ban = async (req , res) => {
    const { id } = req.params

    const mainUser = await userModel.findOne({_id : id}).lean()
    if (!mainUser) {
        return res.status(404).json({message : "User not found!"})
    }

    const banUserResult = await banedUserModel.create({ phoneNumber : mainUser.phoneNumber})

    if(banUserResult) {
        return res.status(201).json({message : "User has been banned successfully."})
    }


    return res.status(500).json({message : "Internal Server Error!"})
}

exports.changeRole = async (req , res) => {
    const { id } = req.body
    const isValidID = isValidObjectID(id)
    const user = await userModel.findOne({ _id : id})

    if(!isValidID) {
        return res.status(409).json({message : "userId isnt valid!"})
    } else if(!user) {
        return res.status(404).json({message : "userID isnt exist in DB!"})
    }

    let newRole = user.role === "ADMIN" ? "USER" : "ADMIN"

    const updatedUser = await userModel.findByIdAndUpdate(
        {_id : id},{
            role : newRole
        }
    )

    if(!updatedUser) {
        return res.status(500).json({message : "An error occurred while updating the users role!"})
    }
    return res.json({message : "user role changed successfully."})
}

exports.rmUser = async (req ,res) => {
    const { id } = req.params
    const isValidID = isValidObjectID(id)

    if(!isValidID) {
        return res.status(409).json({message : "userId isnt valid!"})
    }

    const removeUser = await userModel.findByIdAndRemove({_id : id})

    if(!removeUser) {
        return res.status(404).json({message : "there isnt any user with this data!"})
    }

    return res.json({message : "user removed successfully."})
}

exports.updateData = async (req , res) => {
    const { username , name , email , password , phoneNumber } = req.body

    const hashedPass = await bcrypt.hash(password , 12)

    const user = await userModel.findByIdAndUpdate(
        req.user.id,
        {
            username,
            name,
            email,
            password : hashedPass,
            phoneNumber
        },
        { new: true }
    ).select("-password").lean()

    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }

    return res.json(user)
}

exports.getAll = async (req , res) => {
    const users = await userModel.find({}).lean()

    return res.json(users)
}

