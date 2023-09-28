const { query } = require("../db")

async function SaveProfile(req, res, next){
    try {
        const {filename} = req.file
        const email = req.email

        const sql = `UPDATE users SET avatar = '${filename}' where email='${email}'`
        await query(sql)

        res.json({filename})
    } catch (error) {
        console.log(error)
        if (error.sqlMessage)
            return res.status(422).json({ message: error.sqlMessage })
        res.status(500).json({ message: "Something went wrong..." })
    }
}

module.exports = SaveProfile