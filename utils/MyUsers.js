const { query } = require("../db");

async function MyUsers(admin) {
    try {
        const sql = `
        SELECT  USERS.*, genders.gender, departments.name AS department,
        GROUP_CONCAT(
            (SELECT courses.name from courses WHERE courses.id = users_courses.id)
        ) as course
        FROM users 
        INNER JOIN departments ON users.ID  = departments.ID and users.admin='${admin}'
        LEFT JOIN genders ON USERS.GENDERID = genders.ID
        LEFT JOIN users_courses on users_courses.user = users.email 
        GROUP By users.email;
        `;

        const users = await query(sql)

        return users
        
    } catch (error) {
        Promise.reject(error);
    }
}

module.exports = MyUsers