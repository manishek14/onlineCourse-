const userModel = require("../../models/user")
const registerValidator = require("../../validators/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.register = async (req , res) => {
    const validationResult = await registerValidator(req.body)
    if(validationResult != true){
        return res.status(422).json(validationResult);
    }

    const {userName , name , email , phoneNumber , password, confirmPassword} = req.body

    const isUserExists = await userModel.findOne({
        $or : [{userName} , {email}]
    })

    if(isUserExists){
        return res.status(409).json({message :"userName or email is duplicated"})
    }

    const hashedPass = await bcrypt.hash(password , 12)
    const countOfUsers = await userModel.countDocuments()

    const user = await userModel.create({
        userName,
        name,
        email,
        phoneNumber,
        password : hashedPass,
        role : countOfUsers > 0 ? "USER" : "ADMIN"
    })
    const userOBJ = user.toObject()
    Reflect.deleteProperty(userOBJ, "password")

    const accessToken = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : "14 day"})
    return res.status(201).json({ user: userOBJ, accessToken })
}

exports.login = async (req , res) => {}

exports.getMe = async (req , res) => {}