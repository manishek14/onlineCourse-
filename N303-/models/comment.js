const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    body : {
        type : String,
        required : true
    },
    course : {
        type : mongoose.Types.ObjectId,
        ref : "course",
        required : true
    },
    creator : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    },
    isAccept : {
        type : Number,
        required : true
    },
    isAnswer : {
        type : Number,
        required : true
    },
    mainComment : {
        type : mongoose.Types.ObjectId,
        ref : "comment",
        required : true
    }
},{timestamps : true})

const model = mongoose.model("comment" , schema)
module.exports = model