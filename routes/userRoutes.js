const AddCourses = require("../controllers/courses/AddCourses");
const DeleteCourse = require("../controllers/courses/DeleteCourse");
const MyCourses = require("../controllers/courses/MyCourses");
const upload = require("../utils/Upload")
const { SaveProfile } = require("../controllers");
const router = require("express").Router();

router.post("/addCourses", AddCourses);
router.get("/myCourses", MyCourses);
router.delete("/myCourse/:id", DeleteCourse);
router.post("/upload/avatar", upload.single("avatar"), SaveProfile);

module.exports = router;
