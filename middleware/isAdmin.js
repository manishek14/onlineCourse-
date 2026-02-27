module.exports = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required!" });
    }

    const isAdmin = req.user.role === "ADMIN";

    if (isAdmin) {
        return next();
    }

    return res.status(403).json({ message: "This route isn't accessible for your role!" });
};
}