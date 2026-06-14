const Product = require('../models/product');          //importing the Product class from the models
const Cart = require('../models/cart');
const db = require('../util/database');

exports.getProductAdd = (req,res,next)=>{
    res.render('add-product',{Titlename : "Add-Product"});
}

exports.postProductAdded = (req,res,next)=>{            //product is added then the data is stored in the form of objects here object is product
    console.log(req.body);                             //it takes the data from parsebody.
    const product = new Product(req.body.id,req.body.product);     //creating a new product instance object with name of product
    product.save()
    .then(()=>{
        res.redirect('/shop');                         // it redirects from one page to other page
}                                                      
    ).catch((err)=>{
        console.log(err);
    });                                    //using onject to call the function
}

exports.productId = (req,res,next) => {               //retriving product by product ID.
    const prodId = req.params.productId;              // by the help of params we can access the url variables.
    Product.findById(prodId).then(([product,Datafield])=>{
        res.render('product-details',{prods:product[0],Titlename:"Another Product"});
    }).catch((err)=>{
        console.log(err);
    });
    }


exports.postCart = (req,res,next) =>{       //products gets added to cart json when the add t ocart is clicked
    const productId = req.body.productId;
    Product.findById(productId)
    .then(([product])=>{
        Cart.addProduct(productId,product[0].price);
        res.redirect('/cart');
    }).catch((err)=>{console.log(err)});
}
exports.addedToCart = async (req, res, next) => {
    try {
        const [cartitems] = await Cart.getCart();
        if (cartitems.length === 0) {
            return res.render('Cart', {
                cart: [],
                Totalprice: 0
            });
        }
        const [products] = await db.execute(
            'SELECT * FROM cart c INNER JOIN products p ON c.id = p.id'
        );
        const [totalResult] = await db.execute(
            'SELECT SUM(price) AS totalPrice FROM cart'
        );
        const totalPrice = totalResult[0].totalPrice || 0;
        res.render('Cart', {
            cart: products,
            Totalprice: totalPrice
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.postDeleteProduct = (req,res,next) =>{
    const productId = req.body.productId;
    Product.deleteById(productId)
    .then(()=>{
        res.redirect('/shop');
    })
    .catch();
};

exports.postDeleteCart = (req,res,next) => {
    const prodId = req.body.productId;
    Cart.deleteFromCart(prodId)
    .then(()=>{
    res.redirect('/cart');
    })
    .catch((err)=>{console.log(err)});
    
}

exports.productlist = (req,res,next)=>{              //display all the product list
    Product.fetchAll()
    .then(([rows,Datafields])=>{
        res.render('shop',{prods:rows,Titlename :"Shop"});
    })
    .catch((err)=>{
        console.log(err);
    });                                                          //retriving the products array from the product class which is in models
}