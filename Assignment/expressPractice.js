const express = require('express');
const fs = require('fs');
const app = express();

const parsedata = require('body-parser');
app.use(parsedata.urlencoded());

app.use('/product',(req,res,next)=>{
    res.send('<form action = "/rating" method = "POST"><input type = "text" name = "product"></input><button type = "submit">Submit</button></form>');
});
app.use('/rating',(req,res,next)=>{
    fs.appendFile('product.txt',req.body.product+" ",(err)=>{
        if(err){
            res.redirect('/');
        }else{
            next();
        }
    });
});
app.use('/rating',(req,res,next)=>{
    res.send('<form action = "/entered" method = "POST"><input type ="text" name = "rating"></input><button type = "submit">Submit</button></form>');
});
app.use('/entered',(req,res,next)=>{
    fs.appendFile('product.txt',req.body.rating+'\n',(err)=>{
        if(err){
            res.redirect('/');
        }else{
            res.send('<h1>Thanks For Shopping</h1>');
        }
    });
});

app.use('/',(req,res,next)=>{
    res.send('Something went wrong');
});

app.listen(5000);