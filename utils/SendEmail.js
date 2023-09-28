const nodemailer = require("nodemailer")
const { user , pass} = require("../config")

const html = (title, text) => {
    return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title.slice(0, 10)}...</title>
    </head>
    <body>
        ${text}
    </body>
    </html>
    `)
}

async function Send_Email({from , to, subject, text}){
    try {
        // console.log(from, to)
        const mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass
            },
            port: 587
        })

        const details = {
            from: {
                name: "UMS Email Service",
                address: user
            },
            to,
            subject,
            html: html(subject, text)
        }

        const sent = await mailTransport.sendMail(details)

        return sent
    } catch (error) {
        return Promise.reject(error)        
    }
}

module.exports = Send_Email