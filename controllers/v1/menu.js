const menuModel = require("../../models/menu");

exports.getAllMenus = async (req, res) => {
  const menus = await menuModel.find({}).lean();

  menus.forEach((menu) => {
    const submenu = [];
    for (let i = 0; i < menus.length; i++) {
      const mainMenu = menus[i];
      if (mainMenu.parentID && mainMenu.parentID.equals(menu._id)) {
        submenu.push(mainMenu);
        menus.splice(i, 1);
        i--;
      }
    }
    menu.submenu = submenu;
  });

  return res.json(menus);
};

exports.create = async (req, res) => {
  const { title, href, parentID } = req.body;

  const isValidParentID = mongoose.Types.ObjectId.isValid(parentID);
  if (!isValidParentID) {
    return res.status(409).json({ message: "ParentID isnt valid!" });
  }

  const createMenu = await menuModel.create({ title, href, parentID });

  return res.status(201).json({ message: "menu has created successfully." });
};

exports.getAll = async (req, res) => {
  const allMenus = await menuModel
    .find({})
    .populate("parentID", "title")
    .lean();

  return res.json(allMenus);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return res.status(409).json({ message: "ID isnt valid!" });
  }

  const remove = await menuModel.findOneAndDelete({ _id: id });
  
  return res.json({ message: "menu has removed successfully." });
};
