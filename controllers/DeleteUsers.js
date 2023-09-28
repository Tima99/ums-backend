const { Users, query } = require("../db")
const MyUsers = require("../utils/MyUsers")

async function DeleteUsers(req, res){
    try {
        let usersToDelete = req.body
        usersToDelete = usersToDelete.map(item => '\"' + item + '\"')

        await query(`delete from ${Users} where email in (${usersToDelete})`)
        // const users  = await query(`SELECT USERS.email, users.phone, USERS.password,USERS.genderId, genders.gender AS gender, departments.name AS department, users.ts FROM users INNER JOIN departments on users.ID = departments.ID and users.admin="${req.email}" LEFT JOIN genders ON USERS.GENDERID = genders.ID;`)

        const users = await MyUsers(req.email)
        
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong..." })
    }
}

module.exports = DeleteUsers