const express = require('express');

const productController = require('../controller/product');

const router = express.Router();

const adminRouter = require('./admin');

router.get('/',productController.productlist);

module.exports = router;