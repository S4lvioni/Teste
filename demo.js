const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "unigran",
    database: "mydb"
});

con.query("DELETE name,senha,id FROM usuarios WHERE id = ?", [id], function (err, result) {
    res.render('../public/index.html')
})