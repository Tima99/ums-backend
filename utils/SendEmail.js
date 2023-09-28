const nodemailer = require("nodemailer")
const { user , pass} = require("../config")

async function Send_Email({from , to, subject, text}){
    try {
        // console.log(user, pass)
        const mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass
            },
            port: 587
        })

        const details = {
            from: from || {
                name: "Cyber Space - UMS",
                address: user
            },
            to,
            subject,
            html: text
        }

        const sent = await mailTransport.sendMail(details)

        return sent
    } catch (error) {
        return Promise.reject(error)        
    }
}

module.exports = Send_Email