var mysql = require ('mysql');
var connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"scanner_db"
})
module.exports=connect