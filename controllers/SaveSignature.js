const { query } = require("../db")

async function SaveSignature(req, res){
    try {
        const {signature, title} = req.body
        
        const admin = req.email

        await query(`Insert into signatures (signature, admin, title) values ('${signature}', '${admin}', '${title}' )`)

        const signatureRows = await query(`Select * from signatures where admin = '${admin}'`)

        res.json(signatureRows)
        // const 
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong...")
    }
}

module.exports = SaveSignature