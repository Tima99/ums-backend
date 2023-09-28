const mysql = require("mysql");

const { DB_HOST_NAME, DB_USER_NAME, DB_PASSWORD, DB_DATABASE_NAME } = require("./config");

const con = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST_NAME,
    user: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
});

function query($query) {
    return new Promise((res, rej) => {
        con.query($query, function (err, result) {
            if (err) return rej(err);
            return res(result);
        });
    });
}
const Users = "users";
exports.Users = Users;

async function createDatabase(dbname) {
    console.log("Database Connected!");
    if(!dbname) return

    const dbCreated = await query(`create database if not exists ${dbname}`);
    const useDb     = await query(`use ${dbname}`);

    // create table
    await query("create table if not exists Admin(email varchar(50) primary key,password varchar(50))");
    await query(
        `create table if not exists ${Users}(email varchar(50) primary key,phone text(10) unique,password varchar(50), ID INT(255),admin varchar(50))`
    );
}

exports.con = con;
exports.createDatabase = createDatabase;
exports.query = query;
