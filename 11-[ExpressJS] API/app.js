const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const mysql_config = require('./inc/mysql_config');
const functions = require('./inc/functions');

const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

// init server
const app = express();
app.listen(3000,() => {
    console.log("API is running");
});

app.use((req,res,next)=>{
    if(API_AVAILABILITY){
        next(); // The current middleware has finished executing and control should be passed to the next middleware or route.
    } else{
        res.json(functions.response('warning', 'API is in maintenance. Sorry',0,null));
    }
});

//mysql connection
const connection = mysql.createConnection(mysql_config);

//cors
app.use(cors());

//middlewares
app.use(express.json()); // data post using json
app.use(express.urlencoded({extended: true}));

//routes

app.get('/',(req,res)=>{
    res.json(functions.response('success','API is running',0,null));
});

//endpoints

app.get('/tasks',(req,res)=>{
    connection.query("SELECT * FROM tasks",(err,rows)=>{
        if(!err){
            res.json(functions.response('success','success',rows.length,rows));
        }else{
            res.json(functions.response('error',err.message,0,null));
        }
    })
});

app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    connection.query(`SELECT * FROM tasks WHERE id = ?`,[id],(err,rows)=>{
        if(!err){
            if(rows.length > 0 ){
                res.json(functions.response('success','success',rows.length,rows));
            }else{
                res.json(functions.response('error','Task not found',0,null));
            }
        }else{
            res.json(functions.response('error',err.message,0,null));
        }
    })
});

//modify the row value of a column in a table through a request
app.put('/tasks/:id/status/:status',(req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    connection.query('UPDATE tasks SET status = ? WHERE id = ?',[status,id],(err,rows)=>{
        if(!err){
            if(rows.affectedRows > 0){
                res.json(functions.response('success','success',rows.affectedRows,null));
            }else{
                res.json(functions.response('warning','Task not found',0,null));
            }
        }else{
            res.json(functions.response('error',err.message,0,null));
        }
    })
});

app.delete('/tasks/:id/delete',(req,res)=>{
    const id = req.params.id;
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (err,rows)=>{
        if(!err){
            if(rows.affectedRows > 0){
                res.json(functions.response('success','Task deleted',rows.affectedRows,null));
            }else{
                res.json(functions.response('warning','Task not found',0,null));
            }
        }else{
            res.json(functions.response('error',err.message,0,null));
        }
    })
});

app.post('/tasks/create',(req,res)=>{

    //get data from request
    const post_data = req.body;

    //check if data is empty
    if(post_data ==  undefined){
        res.json(functions.response('warning','Empty data',0,null));
        return;
    }

    //check if data is invalid
    if(post_data.task == undefined || post_data.status == undefined){
        res.json(functions.response('warning','Invalid data',0,null));
    }

    const task = post_data.task;
    const status = post_data.status;

    //insert new task
    connection.query('INSERT INTO tasks (task,status,created_at,updated_at) VALUES(?,?,NOW(),NOW())',[task,status],(err,rows)=>{
        if(!err){
            res.json(functions.response('success','Task created', rows.affectedRows,null));
        }else{
           res.json(functions.response('error',err.message,0,null)); 
        }
    });
})

app.put('/tasks/:id/update',(req,res)=>{
    const id = req.params.id;
    const post_data = req.body;

    //check if data is empty
    if(post_data ==  undefined){
        res.json(functions.response('warning','Empty data',0,null));
        return;
    } 
    
    //check if data is invalid
    if(post_data.task == undefined || post_data.status == undefined){
        res.json(functions.response('warning','Invalid data',0,null));
    }

    //get data from request
    const task = post_data.task;
    const status = post_data.status;

    //update data
    connection.query('UPDATE tasks SET task = ?, status = ? updated_at = NOW() WHERE id = ?',[task,status,id],(err,data)=>{
        if(!err){
            if(rows.affectedRows > 0){
                res.json(functions.response('success','Task updated', rows.affectedRows,null));
            }else{
                res.json(functions.response('warning','Task not found',0,null));
            }
        }else{
           res.json(functions.response('error',err.message,0,null)); 
        }
    });
});

app.use((req,res)=>{
    res.json(functions.response('error','Route not found',0,null));
});