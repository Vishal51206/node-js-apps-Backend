const express = require('express');

const path = require('path');
const port = 4000;

const adminRouter = require('./routes/admin');

const shopRouter = require('./routes/shop');

const app = express();
const parsebody = require('body-parser'); //it helps to collect the request chunks entered by user
app.use(parsebody.urlencoded()); // it encodes the rawbytes into readable strings

app.use('/admin',adminRouter.router); // here the '/admin' adds prefix to the routs in admin ex: admin/choose-product ,so you don't repeat it in every route individually. now you can access /choose-product by doing /admin/choose-product. it adss prefix automatically for routes.

app.use('/shop',shopRouter);

console.log(adminRouter.products);

app.set('view engine','pug'); //sets default view engine as pug so that we dont need to specify res.render(shop.pug) instead we can write as res.render(shop), cause it automatically knows which view engine to be used default after we setting it to default.

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(port);