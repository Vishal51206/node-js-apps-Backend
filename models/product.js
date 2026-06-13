const path = require('path'); 
const fs = require('fs');
const { json } = require('body-parser');

const db = require('../util/database');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = cb => {
    fs.readFile(p,(err, filecontent) =>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(filecontent));
        }
    });
};

const randInt = (min,max) =>{
    return Math.floor(Math.random() * (max-min +1)) + min; // gives a random integer.
}
const min = randInt(1000,5000);
const max = randInt(min, 100000);

module.exports= class  product {

    constructor(id,title){
        this.id = id;
        this.title = title;
    }

    save(){
    this.price = randInt(
        randInt(1000,5000),
        100000
    );

    return db.execute(
        'INSERT INTO products (id,title, price) VALUES (?,?,?)',
        [this.id,this.title, this.price]
    );
}

    static deleteById(id){
        return db.execute('delete from products where products.id = ?',[id]);
    }


    static fetchAll(){     //called by class name not by object name cause its static.
       return db.execute('SELECT * from products');
    }

   static findById(id){
    return db.execute('select * from products where products.id = ?',[id]);
   }

    
}