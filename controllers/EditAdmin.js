const { query } = require("../db")
const passwordValidator = require('password-validator');

const notValidPassword = (password) => {
    let schema = new passwordValidator();

    // Add properties to it
    schema
        .is().min(6)                                    // Minimum length 8
        .is().max(20)                                  // Maximum length 100
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()

    return !schema.validate(password)
}


async function EditAdmin(req, res) {
    try {
        const { email, newEmail, password } = req.body


        if (notValidPassword(password)) return res.status(422).json({ message: "Password is not valid" })


        const editAdmin = await query(`update admin set email = "${newEmail}" , password="${password}" where email="${email}"`)

        await query(`update users set admin = "${newEmail}" where admin = "${email}" `)

        if (editAdmin.affectedRows == 0) return res.status(422).json({ message: 'could not update' })

        // clear cookie
        // as in old jwt thier is old email then there is no document in table admin
        // user have to login again after edit
        res.clearCookie('jwt')

        res.json({ message: 'ok' })

    } catch (error) {
        console.log(error)
        if (error.sqlMessage)
            return res.status(422).send({ message: error.sqlMessage })
        res.status(500).send({ message: "Something went wrong..." })
    }
}

module.exports = EditAdmin