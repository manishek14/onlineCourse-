const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    description : {
        type: String, 
        required: true 
    },
    cover : {
        type: String, 
        required: true     
    },
    href : {
    },
    price : {
        type: Number, 
        required: true         
    }, 
    status : {
        type: String, 
        required: true     
    },
    discount : {
        type: Number, 
        required: true     
    },
    categoryID : {
        type : mongoose.Types.ObjectId 
        ref : "category"
    },
    creator : {
        type : mongoose.Types.ObjectId 
        ref : "user"
    }
  },
  { timestamps: true }
)

schema.virtual("session" , {
    ref : "session",
    localField : "_id",
    foreginField : "course"
})

const model = mongoose.model("Course" , schema)
