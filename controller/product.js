const Product = require('../models/product');          //importing the Product class from the models
const Cart = require('../models/cart');

exports.getProductAdd = (req,res,next)=>{
    res.render('add-product',{Titlename : "Add-Product"});
}

exports.postProductAdded = (req,res,next)=>{
    console.log(req.body);                             //it takes the data from parsebody.
    const product = new Product(req.body.product);     //creating a new product instance object with name of product
    product.save();                                    //using onject to call the function
    res.redirect('/shop');                             // it redirects from one page to other page
}

exports.productId = (req,res,next) => {
    const prodId = req.params.productId;              // by the help of params we can access the url variables.
    Product.findById(prodId, product =>{              //using function from model
        console.log("product found for details:", product);
        res.render('product-details',{prods:product,Titlename:"Another Product"});
    });
} 

exports.postCart = (req,res,next) =>{
    const productId = req.body.productId;
    Product.findById(productId, (product) =>{
        Cart.addProduct(productId,product.price);
        res.redirect('/cart');  //it redirects to 'GET' type.
    });
}

exports.productlist = (req,res,next)=>{
    Product.fetchAll((products) => {
         res.render('shop',{prods:products,Titlename :"Shop"});
    });                                                          //retriving the products array from the product class which is in models
}