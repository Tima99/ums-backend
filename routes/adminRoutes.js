const { Logout, AddUser, Departments, DeleteUsers, EditUser, EditAdmin, SendEmail } = require("../controllers")
const MySigantures = require("../controllers/MySigantures")
const myUsers = require("../controllers/myUsers")
const SaveSignature = require("../controllers/SaveSignature")
const { query } = require("../db")

const router = require("express").Router()

router.get('/auth', async (req, res) => {

    const admin = await query(`select * from admin where email = "${req.email}"`)
    
    res.json(admin[0])
})
router.get('/users', myUsers)
router.get('/logout', Logout)
router.get('/departments', Departments)
router.post('/addUser', AddUser)
router.post('/editUser', EditUser)
router.post("/deleteUsers", DeleteUsers)
router.post('/editAdmin', EditAdmin)

router.route('/signature').get(MySigantures).post(SaveSignature)

router.post('/sendEmail', SendEmail)

module.exports = router

/**
 * users - table
 * users_courses - table
 * every user selected course goes to table users_courses
 * select * from users 
 */