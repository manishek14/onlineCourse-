const articleModel = require("../../models/article");
const categoryModel = require("../../models/category");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
    const allArticles = await articleModel.find({})
        .populate("categoryID", "title")
        .populate("creator", "name")
        .lean();
    res.json(allArticles);    
};

exports.create = async (req, res) => {
    const { title, href, description, body, categoryID, publish } = req.body;
    
    const isValidCategoryID = await categoryModel.findById(categoryID);
    if (!isValidCategoryID) {
        return res.status(409).json({ message: "categoryID isn't valid!" });
    }
    
    if (!req.files || !req.files.cover) {
        return res.status(400).json({ message: "Cover image is required!" });
    }
    
    const create = await articleModel.create({
        title,
        href,
        body,
        description,
        cover: req.files.cover[0].filename,
        categoryID,
        creator: req.user.id,
        publish: publish || 0
    });
    
    return res.status(201).json({ message: "Article added to DB successfully" });
};

exports.getOne = async (req, res) => {
    const { href } = req.params;
    const findingHref = await articleModel.findOne({ href })
        .populate("categoryID", "title")
        .populate("creator", "name");
        
    if (!findingHref) {
        return res.status(404).json({ message: "href isn't in DB!" });
    }
    return res.json({ article: findingHref });
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (!isValidID) {
        return res.status(409).json({ message: "ID isn't valid!" });
    }
    const remove = await articleModel.findByIdAndDelete(id);
    return res.json({ message: "Article removed successfully." });
};

exports.saveDraft = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (!isValidID) {
        return res.status(409).json({ message: "ID isn't valid!" });
    }
    const draft = await articleModel.findByIdAndUpdate(id, { publish: 1 }, { new: true });
    return res.json({ message: "Article has been drafted successfully" });
};

