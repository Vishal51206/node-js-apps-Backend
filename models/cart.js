const db = require('../util/database');
const Productsdata = require('../models/product');


module.exports = class Cart{
    static addProduct(id,ProductPrice){
       return db.execute('insert into cart (id,price) values(?,?)',[id,ProductPrice]);
    }

    static deleteFromCart(id){
       return db.execute('delete from cart where id = ?',[id]);
    }

    static getCart(){
        return db.execute('select * from cart');
    }
}    
