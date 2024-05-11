let mysql = require("mysql");

// connection to mysql

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "capymusic"
});

module.exports = con;