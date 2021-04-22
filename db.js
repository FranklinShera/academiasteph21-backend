const mysql = require('mysql')
require('dotenv').config()

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'as21',
    // host : process.env.HOST,
    // user : process.env.USERNAME,
    // password : process.env.PASSWORD,
    // database : process.env.DATABASE,
})



// Connect
conn.connect((err) =>{
    if(err) throw err
    console.log("Connected To MySQL!")
});

module.exports = { conn }