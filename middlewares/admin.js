
async function admin(req, res, next){
    try {
        const admin = req.admin

        if(admin)
            next()
        else
            return res.status(401).json("You are not a admin!")

    } catch (error) {
        console.log(error.message || error);
        res.status(500).json(error)
    }
}


module.exports = admin