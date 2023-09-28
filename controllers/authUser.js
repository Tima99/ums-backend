const { query } = require("../db")

async function authUser(req, res){
    try {
        const email = req.email
        // const adminEmail = req.adminEmail

        const usersRow = await query(`SELECT USERS.email, users.avatar, users.phone, USERS.password, departments.name AS department, users.admin FROM users INNER JOIN departments WHERE users.ID = departments.ID and users.email = "${email}"  ;`)

        res.json(usersRow[0])
    } catch (error) {
        console.log(error)
        if (error.sqlMessage)
            return res.status(422).send({ message: error.sqlMessage })
        res.status(500).send({ message: "Something went wrong..." })
    }
}

module.exports = authUser