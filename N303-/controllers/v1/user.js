const banedUserModel = require("../../models/banUser")
const userModel = require("../../models/user")

exports.ban = async (req , res) => {
    const mainUser = await userModel.findOne({_id : req.params.id}).lean()
    if (!mainUser) {
        return res.status(404).json({message : "User not found"})
    }
    const banUserResult = await banedUserModel.create({ phoneNumber : mainUser.phoneNumber})

    if(banUserResult) {
        return res.status(201).json({message : "User has been banned successfully"})
    }

    return res.status(500).json({message : "Internal Server Error"})
}

exports.getAll = async (req , res) => {
    const users = await userModel.find({}).lean()
    const userOBJ = users.map(user => {
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    })
    res.json(userOBJ)
}