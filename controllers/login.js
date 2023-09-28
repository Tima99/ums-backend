const passwordValidator = require('password-validator');
const SaveJwt = require('../utils/SaveJwt');
const {query} = require("../db")

const notValidPassword = (password) => {
    let schema = new passwordValidator();

    // Add properties to it
    schema
        .is().min(6)                                    // Minimum length 8
        .is().max(20)                                   // Maximum length 100
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()

    return !schema.validate(password)
}



const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (notValidPassword(password)) return res.status(422).json({ message: "Password is not valid" })

        const userRow = await query(`select * from Admin where email = "${email}"`)

        if(userRow.length <= 0) return res.status(422).send({ message : "No Admin Exists"})

        if(userRow[0].password !== password) return res.status(422).send({ message : "Password wrong"})

        
        SaveJwt({ email , admin: true}, res)

        res.json({ message: "ok" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong..." })
    }
}

module.exports = Login