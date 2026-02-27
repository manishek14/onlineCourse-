const courseModel = require("../../models/course");

exports.getResult = async (req , res) => {
    const { keyword } = req.body
    
    const search = await courseModel.find({ $regex : ".*" + keyword + ".*"})
    
    return res.json(search)
}