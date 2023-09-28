const Course = require("./Course")

async function MyCourses(req, res){
    try {
        const user = req.email
        
        const courses = await Course.findAll({user})
        
        res.json(courses)
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong...")
    }
}

module.exports = MyCourses