const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const path = require('path');
const mysql = require('mysql');
const { exists } = require('fs');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "unigran",
    database: "mydb"
});
var id;

app.post('/', async (req, res) => {
    res.render('index.html');
})

app.post('/login', async (req, res) => {
    let username = req.body.login;
    let senha = req.body.password;
    let usernameDB;
    let senhaDB;
    let idS;
    let idU;

    con.query("SELECT name,senha,id FROM usuarios WHERE name = ? ", [username], function (err, result) {

        if (result[0] === undefined) {
            res.render('erro.html')
        }
        else if (result[0].name != undefined || result[0].name != null) {
            usernameDB = result[0].name
            
        }

    })

    con.query("SELECT senha FROM usuarios WHERE senha = ?", [senha], function (err, result) {

        if (result[0] == undefined) {
            res.render('erro.html')
        }
        else if (result[0].senha != undefined || result[0].senha != null) {
            senhaDB = result[0].senha
        }
    })

    setTimeout(function () {
        if (username == usernameDB && senha == senhaDB) {
            
            con.query("SELECT id FROM usuarios WHERE (name,senha) = (?, ?)", [username,senha], function (err, result) {
                if (err) throw err;
                id = result[0].id
                console.log(id)
            })
            
            res.render('dashboard.html')
        }
    }, 100);


})

app.post('/criarusuario', async (req, res) => {
    var nomeUsuario = req.body.nome;
    let senha = req.body.senha;

    var sql = "INSERT INTO usuarios (name, senha) VALUES (?)";
    var values = [
        nomeUsuario, senha
    ]
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        else res.render('redirect.html');
    })
});


app.get('/listarusuario', async (req, res) => {
    con.query("SELECT name FROM usuarios", function (err, result) {

        res.send(result)
    })

});

app.post('/apagarusuario', async (req, res) => {
    
    console.log('Debugger manual!')
    var sql = "DELETE FROM usuarios WHERE id = ?";
    var values = [
        id
    ]
    con.query(sql, [values], function (err, result) {
        if (err){
            throw err;
        } else res.render('redirect.html');
    })
})

let port = process.env.PORT || 3035;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
