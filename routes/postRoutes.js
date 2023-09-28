const router = require("express").Router()
const { Login, Userlogin } = require('../controllers')

router.post('/login', Login)
router.post('/userlogin', Userlogin)

module.exports = router