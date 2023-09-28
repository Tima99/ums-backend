const { query } = require("../db")

async function Departments(req, res){
    try {
        const departments = await query(`select * from departments`)
        // console.log(departments);
        res.json(departments)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong..." })
    }
}
module.exports = Departments