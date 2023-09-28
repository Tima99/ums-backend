const Course = require("./Course")

async function DeleteCourse(req, res){
    try {
        const user = req.email
        const {id} = req.params
        await Course.delete({id, user})
        res.redirect(303, '/api/myCourses')
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong...")
    }
}

module.exports = DeleteCourse