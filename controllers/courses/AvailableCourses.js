const { query } = require("../../db")

async function AvailableCourses(req, res){
    try {
        const courses = await query(`Select * from courses`)
        
        res.json(courses)
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong...")
    }
}

module.exports = AvailableCourses