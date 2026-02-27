const articleModel = require("../../models/article")
const categoryModel = require("../../models/category")

exports.getAll = async (req , res) => {
    const allArticels = await articleModel.find({}).lean()
    res.json(allArticels)    
}

exports.create = async (req , res) => {
    const { title, href, description, body, cover, categoryID, publish } = req.body
    const isValidCategoryID = await categoryModel.findOne({_id : categoryID})
    if(!isValidCategoryID) {
        return res.status(409).json({message : "categoryID isnt valid!"})
    }
    const create = await articleModel.create({
        title,
        href,
        body,
        description,
        cover : req.files.cover[0].filename,
        categoryID,
        creator : req.user._id,
        publish : 0
    })
    return res.status(201).json({message : "article added to db successfully"})
}

exports.getOne = async (req , res) => {
    const { href } = req.params
    const findingHref = await articleModel.findOne({ href })
    if(!findingHref){
        return res.status(404).json({message : "href isnt in db!"})
    }
    return res.json({ findingHref })
}

exports.remove = async (req , res) => {
    const { id } = req.params
    const isValidID = mongoose.Types.ObjectId.isValid(id)
    if(!isValidID) {
        return res.status(409).json({message : "ID isnt valid!"})
    }
    const remove = await articleModel.findOneAndRemove({ _id : id })
    return res.json({message : "article removed successfully."})
}

exports.saveDraft = async (req , res) => {
    const { id } = req.params
    const isValidID = mongoose.Types.ObjectId.isValid(id)
    if(!isValidID) {
        return res.status(409).json({message : "ID isnt valid!"})
    }
    const draft = await articleModel.findOneAndUpdate({ _id : id }, { publish : 1 })
    return res.json({ message : "article has been drafted successfully" })
}

