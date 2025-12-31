const userModel = require("../../models/user")
const registerValidator = require("../../validators/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const path = require("path")
require("dotenv").config(path.join("../.env"))

exports.register = async (req , res) => {
    const validationResult = await registerValidator(req.body)
    if(validationResult != true){
        return res.status(422).json(validationResult);
    }

    const {username , name , email , phoneNumber , password, confirmPassword} = req.body

    const isUserExists = await userModel.findOne({
        $or : [{username} , {email}, {phoneNumber}]
    })

    if(isUserExists){
        return res.status(409).json({message :"userName, email, or phoneNumber is duplicated"})
    }

    const hashedPass = await bcrypt.hash(password , 12)
    const countOfUsers = await userModel.countDocuments()

    const user = await userModel.create({
        username,
        name,
        email,
        phoneNumber,
        password : hashedPass,
        role : countOfUsers > 0 ? "USER" : "ADMIN"
    })
    const userOBJ = user.toObject()
    Reflect.deleteProperty(userOBJ, "password")

    const accessToken = jwt.sign({id : user._id, role: user.role} , process.env.JWT_SECRET , {expiresIn : "14 day"})
    return res.status(201).json({ user: userOBJ, accessToken })
}

exports.login = async (req , res) => {
    const { identifire , password } = req.body
    const user = await userModel.findOne({
        $or : [{email : identifire} , {username : identifire}]
    })

    if(!user){
        return res.status(409).json({
            message : "there is no user with this email or username"
        })
    }

    const isValidPass = await bcrypt.compare(password , user.password)

    if(!isValidPass) {
        return res.status(409).json({message : "password is not valid"})
    }

    const accessToken = jwt.sign({id : user._id, role: user.role} , process.env.JWT_SECRET , {
        expiresIn : "14 day"
    })

    return res.status(200).json({ accessToken })
}

exports.getMe = async (req , res) => {}