const Gender = require("../controllers/Genders")
const { AvailableCourses } = require("../controllers")

const router = require("express").Router()

router.get('/', (_, res) => res.send("Server started ❤🙌"))
router.get('/genders', Gender)
router.get('/courses', AvailableCourses)

module.exports = router