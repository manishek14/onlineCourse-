const jwt = require("jsonwebtoken");
const userModel = require("../models/user")

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                success: false,
                message: "Access token required!" 
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token || token.trim() === "") {
            return res.status(401).json({ message: "Invalid token format!" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            if (jwtError.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired!" });
            }
            return res.status(401).json({ message: "Invalid token!" });
        }

        const userId = decoded.userId || decoded.id || decoded._id;
        const userEmail = decoded.email;
        
        if (!userId && !userEmail) {
            return res.status(401).json({ message: "Invalid token payload!" });
        }

        let query = {};
        
        if (userId) {
            query._id = userId;
        } else {
            query.email = userEmail;
        }

        const user = await userModel.findOne(query)
            .select('-password -refreshToken -__v')
            .lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status && user.status !== 'active') {
            return res.status(403).json({ message: "Account is deactivated!" });
        }

        req.user = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role || 'user',
            ...(user.profile && { profile: user.profile })
        };

        req.rawUser = user;

        next();

    } catch (error) {
        console.error("Authentication middleware error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token signature!" });
        }

        if (error.name === 'MongoError' || error.name === 'MongooseError') {
            return res.status(500).json({ message: "Database error during authentication!" });
        }

        return res.status(500).json({ message: "Internal server error during authentication!" });
    }
};
