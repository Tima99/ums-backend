const { query } = require("../db")

async function MySigantures(req, res){
    try{
        const admin = req.email
        const signatureRows = await query(`Select signature, title from signatures where admin = '${admin}'`)
        res.send(signatureRows)
    }catch(err){
        console.log(err)
        res.status(500).send("Something went wrong...")
    }
}

module.exports = MySigantures