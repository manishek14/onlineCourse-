const jwt = require("jsonwebtoken")

const generateAccessToken = (email) => {
    const token = jwt.sign({email} , process.env.JWT_SECRET , {
        expiresIn: "15m"
    })
    return token;
}

const generateRefreshToken = (email) => {
    const token = jwt.sign({email} , process.env.JWT_REFRESH_SECRET , {
        expiresIn : "7d"
    })
    return token;
}

module.exports = { generateAccessToken, generateRefreshToken };

module.exports = { generateAccessToken, generateRefreshToken }