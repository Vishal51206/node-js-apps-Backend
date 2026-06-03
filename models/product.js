const path = require('path'); 
const fs = require('fs');
const { json } = require('body-parser');

module.exports= class  product {

    constructor(title){
        this.title = title;
    }
    save(){
        const p = path.join(
        path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err,filecontent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(filecontent);
            }
            products.push(this);
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
}