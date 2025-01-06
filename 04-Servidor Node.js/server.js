const http = require('http');

const server = http.createServer((req,res)=>{
    res.write("pedido aceito");
    res.end();
});


//porta,apelido,function
//Podemos passar um endereço ip ou nome localhost no apelido
server.listen(3000, '127.0.0.1', ()=>{
    console.log("Servidor iniciado");
})