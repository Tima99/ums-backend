const { query, Users } = require("../db")
const passwordValidator = require('password-validator');
const MyUsers = require("../utils/MyUsers");

const notValidPassword = (password) => {
    let schema = new passwordValidator();

    // Add properties to it
    schema
        .is().min(6)                                    // Minimum length 8
        .is().max(20)                                  // Maximum length 100
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 1 digits
        .has().not().spaces()

    return !schema.validate(password)
}


async function AddUser(req, res) {
    try {
        const { email, phone, password, department, gender } = req.body
        let date = new Date()
        // console.log(req.body)

        if(notValidPassword(password)) return res.status(422).json({message: 'Password length atleast 6 and must have a-z, 0-9, no spaces'})

        const departmentid = await query(`select id from departments where name="${department}"`)

        await query(`insert into ${Users} (email, phone, password, departmentId, admin, ts ${gender != null ? ', genderId' : ''}) values("${email}", "${phone}", "${password}","${departmentid[0].id}","${req.email}", "${date}" ${gender != null ? `, ${gender}` : ''})`)
        
        // const users  = await query(`SELECT USERS.email, users.phone, USERS.password,USERS.genderId, genders.gender AS gender, departments.name AS department, users.ts FROM users INNER JOIN departments on users.ID = departments.ID and users.admin="${req.email}" LEFT JOIN genders ON USERS.GENDERID = genders.ID;`)

        const users = await MyUsers(req.email)

        res.json(users)

    } catch (error) {
        console.log(error)
        if (error.sqlMessage)
            return res.status(422).send({ message: error.sqlMessage })
        res.status(500).send({ message: "Something went wrong..." })
    }
}

module.exports = AddUser
