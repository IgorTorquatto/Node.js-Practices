const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>home</h1>");
});

app.get('/aluno/:nome',(req,res)=>{
    res.send(`<h1>Olá ${req.params.nome}</h1>`)
});

app.listen(3000,()=>{
    console.log("Servidor executando");
});