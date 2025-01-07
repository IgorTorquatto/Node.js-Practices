const express = require('express');
const app = express();
const mysql = require('mysql2');

const mysql_config = require('./mysql_config');

//ligação com o banco
const connection = mysql.createConnection(mysql_config);

connection.connect(error=>{
    if(error){
        console.log(`Erro na conexão ao MySQL ${error.stack}`);
        return;
    }
    console.log("Conexão bem sucedida");
});

app.get('/',(req,res)=>{
    connection.query('SELECT * FROM tasks',(err,results,fields) => {
        if(err){
            console.log(err);
            res.send('Erro ao obter a lista de tarefas');
        } else {
            res.send(results);
        }
    })
});

app.listen(3000,()=>{
    console.log("Servidor executando");
});