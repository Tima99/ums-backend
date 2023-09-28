const express = require("express")
const {con, createDatabase} = require('./db')
const {getRoutes, postRoutes, protectedRoutes, adminRoutes, userRoutes} = require('./routes')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authentication = require("./middlewares/authentication")
const admin = require("./middlewares/admin")


const app = express()

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
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

app.listen(7000, () => console.log(`Server started on 7000`))

con.getConnection((err) => err ? console.log(err) : createDatabase())

