const express = require("express")
const {con, createDatabase} = require('./db')
const {getRoutes, postRoutes, protectedRoutes, adminRoutes, userRoutes} = require('./routes')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authentication = require("./middlewares/authentication")
const admin = require("./middlewares/admin")
const { PORT } = require("./config")

const app = express()

const corsOptions = {
    origin: ["https://ums-pro.netlify.app"],
    credentials: true
}

app.use(express.static('./uploads'))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use('/api', getRoutes)
app.use('/api', postRoutes)
app.use('/api', authentication,protectedRoutes)
app.use('/api', authentication, userRoutes)
app.use('/api', authentication, admin , adminRoutes)

app.listen(7000, () => console.log(`Server started on ${PORT}`))

con.getConnection((err) => err ? console.log(err) : createDatabase())

