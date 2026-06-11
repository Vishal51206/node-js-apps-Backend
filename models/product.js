const path = require('path'); 
const fs = require('fs');
const { json } = require('body-parser');

const getProductsFromFile = cb => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'products.json'
    );
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

    constructor(title){
        this.title = title;
    }

    save(){
        this.id = Math.random().toString();
        this.price = randInt(min,max);
        console.log(this.price);
        const p = path.join(
        path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err,filecontent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(filecontent);   //retriving all the existing values
            }
            products.push(this);                      //adding new value to old values
            fs.writeFile(p,JSON.stringify(products),(err)=>{  
                console.log(err);
            });
        });
    }
    static fetchAll(cb){     //called by class name not by object name cause its static.
        const p = path.join(
        path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err, filecontent) => {
            if(err){
                 cb([]);
            }
            cb(JSON.parse(filecontent));
        });
    }

   static findById(id, cb){
    getProductsFromFile(products =>{
        const product = products.find((p) => p.id === id);  //it taverse through the data and finds the element
        cb(product);
    });
   }

    
}