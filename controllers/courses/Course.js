const { query } = require("../../db")

const tableName = "users_courses"
class Course{
    constructor({courses, user}){
        this.courses = courses // array of courses id
        this.user = user // string
    }

    async Save(){
        try {

            const sqlValues = this.courses.map( id => {
                return `("${id}", "${this.user}")`
            })

            const sql = `Insert into ${tableName} (id, user) Values ${sqlValues.join(',')}`

            await query(sql)

            return Promise.resolve(1)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
    static async findAll({user}){
        try {
            const sql = `select A.id , courses.name from ${tableName} as A Inner Join courses where A.id = courses.id and user='${user}'`

            const courses = await query(sql)

            return courses
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async delete({id, user}){
        try {
            const sql = `Delete from ${tableName} where id='${id}' and user='${user}' `

            await query(sql)

        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = Course