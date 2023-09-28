const { query } = require("../db")

async function Gender(req, res){
    try {
        
        const genders = await query(`select * from genders`)

        res.json(genders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong...")
    }
}

module.exports = Gender