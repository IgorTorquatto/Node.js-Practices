const express = require('express');
const app = express();

//data
const clients = [
    {id: 1 , name: 'Joao'},
    {id: 2 , name: 'Carlos'},
    {id: 3 , name: 'Felipe'}
];

app.get('/total_clients',(req,res)=>{
    res.send(`Total de clientes: ${clients.length}`);
});

app.get('/client/:id',(req,res)=>{
    const cliente = clients.find((element)=> element.id === parseInt(req.params.id));

    if(!cliente){
        res.status(404).send('Cliente não encontrado');
    }

    res.send(`${cliente.name} ${cliente.id}`);
});

app.listen(3000,()=>{
    console.log("Servidor Executando");
});