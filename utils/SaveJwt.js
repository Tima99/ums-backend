const jwt = require("jsonwebtoken")
const {
    JWT_SECRET_KEY
} = require("../config")


const SaveJwt = (payload, res) => {
    const msIn7Days = 604800000 // ms in 7days
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: '7d',
    })
    
    res.cookie('jwt', token, {
        sameSite:"none",
        httpOnly: "true",
        secure: "true"
        maxAge: msIn7Days
    })

}

module.exports = SaveJwt
