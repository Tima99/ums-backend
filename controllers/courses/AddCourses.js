const Course = require("./Course")

async function AddCourses(req, res){
    try {
        const { courses } = req.body
        const user = req.email

        let course = new Course({
            courses: courses,
            user
        })

        await course.Save()
        
        res.json("Sucess")
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong...")
    }
}

module.exports = AddCourses