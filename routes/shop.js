const express = require('express');

const path = require('path');

const router = express.Router();

const adminRouter = require('./admin');

const prods = adminRouter.products;

router.get('/',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));    //IMP.... //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); sendFile: sends html file as response | path.join: joins all parts into one clean path | __dirname: current file's folder location | '../': go one folder back | 'views': enter views folder | 'shop.html': the file to send
    res.render('shop',{prods}); //renders and sends the .pug view.... always send arrays in {}
});

module.exports = router;