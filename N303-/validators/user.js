const Validator = require("fastest-validator")
// const mongoose = require("mongoose")
// const userModel = require("../models/user")

const v = new Validator()

const schema = {
    name : {
        type: "string", 
        min: 3, 
        max: 50,
    },
    username : {
        type : "string",
        min : 5,
        max : 255,
    },
    email : {
        type : "email",
        min : 8,
        max : 100,
    },
    phoneNumber : {
        type : "number",
        min : 11,
        max : 15
    },
    password : {
        type : "string",
        min : 6,
        max : 255    
    },
    confirmPassword : {
        type : "equal",
        field : password
    }
    $$strict : true,
}

const check = v.compile(schema)
module.exports = check