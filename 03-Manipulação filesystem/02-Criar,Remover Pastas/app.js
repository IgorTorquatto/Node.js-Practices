const fs = require('fs');

//create
fs.mkdirSync('pasta teste')

//remove
if(fs.existsSync('./pasta teste')){
    fs.rmdirSync('./pasta teste')
}