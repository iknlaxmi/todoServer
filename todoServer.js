const express = require('express');
const app = express();

const todoList=['Running','Gardening','Bake cake'];

const PORT=3000;

//get request
app.get('/todos',(req,res)=>{
    res.send(todoList);
})

app.listen(PORT,console.log(`Server is listening on ${PORT}`));