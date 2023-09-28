const { query } = require("../db");
const MyUsers = require("../utils/MyUsers");

async function myUsers(req, res){
    try {
        const email = req.email
        const usersRow = await MyUsers(email)
        res.json(usersRow)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something wrong ..."})
    }
}

module.exports = myUsers