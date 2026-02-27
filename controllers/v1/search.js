const courseModel = require("../../models/course");

exports.getResult = async (req, res) => {
    const { keyword } = req.body;
    
    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required!" });
    }
    
    const search = await courseModel.find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } }
        ]
    }).populate("categoryID", "title").lean();
    
    return res.json({ results: search, total: search.length });
};