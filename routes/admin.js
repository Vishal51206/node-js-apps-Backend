const express = require('express');

const path = require('path');  //defines how to work with paths

const router = express.Router();

const products = [];

router.get('/choose-product',(req,res,next)=>{
    //res.sendFile(path.join(__dirname,'../','views','add-product.html')); //IMP.... //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); sendFile: sends html file as response | path.join: joins all parts into one clean path | __dirname: current file's folder location | '../': go one folder back | 'views': enter views folder | 'add-product.html': the file to send
    res.render('add-product',{Titlename : "Add-Product"});
});

router.post('/product',(req,res,next)=>{
    console.log(req.body);   //it takes the data from parsebody.
    products.push({title : req.body.product});     //here we are storing the request data into products so that we can export
    res.redirect('/shop'); // it redirects from one page to other page
});

//module.exports = router; //its 99% times we do this export

exports.router = router; //Exporting each thing seperately
exports.products = products; //Exporting products separately rather than whole routes