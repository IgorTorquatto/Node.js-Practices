const fs = require('fs');

let msg = "Hello world \n";

//create
fs.writeFileSync('./teste.txt',msg,{flag:'a+'});

//remove
fs.unlinkSync('./teste.txt');

console.log('end');