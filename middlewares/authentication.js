const jwt = require("jsonwebtoken")

async function authentication(req, res, next){
    try {
        const cookies = req.cookies
        if(!cookies.jwt) throw Error("Invalid JWT")
        
        const payload = jwt.verify(cookies.jwt, "AMITSECRETISMINE")

        if(!payload) throw Error("unauthentic")

        req.email = payload.email
        req.admin = payload.admin
        req.adminEmail = payload.adminEmail

        next()

    } catch (error) {
        console.log(error.message || error);
        res.status(500).json(error)
    }
}


module.exports = authentication