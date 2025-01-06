const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    //header
    res.setHeader('Content-Type','text/html');

    //preparar conteúdo HTML
    fs.readFile('./pag1.html',(err,data)=>{
        if(err){
            console.log('erro');
            res.write('erro');
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });

    res.end();
});


//porta,apelido,function
//Podemos passar um endereço ip ou nome localhost no apelido
server.listen(3000, 'localhost', ()=>{
    console.log("Servidor iniciado");
})