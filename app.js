const express = require('express');

const path = require('path');

const adminRouter = require('./routes/admin');

const shopRouter = require('./routes/shop');

const app = express();
const parsebody = require('body-parser'); //it helps to collect the request chunks entered by user
app.use(parsebody.urlencoded()); // it encodes the rawbytes into readable strings

app.use('/admin',adminRouter); // her the '/admin' adds prefix to the routs in admin ex: admin/choose-product ,so you don't repeat it in every route individually. now you can access /choose-product by doing /admin/choose-product. it adss prefix automatically for routes.

app.use('/shop',shopRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(4000);