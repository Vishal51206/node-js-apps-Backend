const express = require('express');

const productController = require('../controller/product');

const router = express.Router();


router.get('/choose-product',productController.getProductAdd); //productController is a file in folder of controller

router.post('/product', productController.postProductAdded);

module.exports = router; //its 99% times we do this export

//exports.router = router; //Exporting each thing seperately
//exports.products = products; //Exporting products separately rather than whole routes