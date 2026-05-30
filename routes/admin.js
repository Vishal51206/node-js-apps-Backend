const express = require('express');

const path = require('path');  //defines how to work with paths

const router = express.Router();

router.use('/choose-product',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','add-product.html')); //IMP.... //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); sendFile: sends html file as response | path.join: joins all parts into one clean path | __dirname: current file's folder location | '../': go one folder back | 'views': enter views folder | 'add-product.html': the file to send
});

router.use('/product',(req,res,next)=>{
    console.log(req.body);   //it takes the data from parsebody.
    res.redirect('/shop'); // it redirects from one page to other page
});

module.exports = router;