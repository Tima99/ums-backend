const { Logout, authUser } = require("../controllers")

const router = require("express").Router()

router.get('/logout', Logout)
router.get('/authUser', authUser)

module.exports = router