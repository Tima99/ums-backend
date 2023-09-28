const Send_Email = require("../utils/SendEmail")

async function SendEmail(req, res){
    try {
        const details = req.body

        const sent = await Send_Email({...details, from : req.email})

        // console.log(sent)

        res.json("Ok")
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Somthing went wrong...")
    }
}

module.exports = SendEmail