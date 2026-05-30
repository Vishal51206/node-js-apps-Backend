const express = require('express');

const app = express();

app.use('/user',(req,res,next)=>{
    res.send('What');
});
app.use('/',(req,res,next)=>{
    res.send('Fist response');
});

app.listen(4000);