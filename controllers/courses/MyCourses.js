const Course = require("./Course")

async function MyCourses(req, res){
    try {
        const user = req.email
        console.log({user})
        const courses = await Course.findAll({user})
        
        res.json(courses)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong..."})
    }
}

module.exports = MyCourses
