const express = require('express');
const app = express();
const morgan = require('morgan');

app.get('/sobre',(req,res)=>{
    res.send("<h1>Sobre</h1>");
});

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send("<h1>Home</h1>");
});

app.listen(3000);