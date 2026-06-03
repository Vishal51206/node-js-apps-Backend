const Product = require('../models/product');          //importing the Product class from the models


exports.getProductAdd = (req,res,next)=>{
    res.render('add-product',{Titlename : "Add-Product"});
}

exports.postProductAdded = (req,res,next)=>{
    console.log(req.body);                             //it takes the data from parsebody.
    const product = new Product(req.body.product);     //creating a new product instance object with name of product
    product.save();                                    //using onject to call the function
    res.redirect('/shop');                             // it redirects from one page to other page
}

exports.productlist = (req,res,next)=>{
    Product.fetchAll((products) => {
         res.render('shop',{prods:products,Titlename :"Shop"});
    });                                                          //retriving the products array from the product class which is in models
}