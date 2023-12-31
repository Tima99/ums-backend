const { query } = require("../db")

async function authUser(req, res){
    try {
        const email = req.email
        // const adminEmail = req.adminEmail

        console.log({email: email})

        const usersRow = await query(`SELECT users.email, users.avatar, users.phone, users.password, departments.name AS department, users.admin FROM users INNER JOIN departments WHERE users.departmentId = departments.id and users.email = "${email}"  ;`)
        console.log({usersRow})
        res.json(usersRow[0])
    } catch (error) {
        console.log(error)
        if (error.sqlMessage)
            return res.status(422).send({ message: error.sqlMessage })
        res.status(500).send({ message: "Something went wrong..." })
    }
}

module.exports = authUser
