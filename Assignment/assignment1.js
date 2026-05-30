const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html><body>');
        res.write('<form action = "/username" method = "POST"><label for="username">Username:</label><input id ="username" name = "username"></input><button type = "submit">Submit</button></form>');
        res.write('</body></html>');
        return res.end();
    }
    
    
    if(url === '/username' && method === "POST"){
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedata = Buffer.concat(body).toString();
            const username = parsedata;
            fs.appendFileSync('username.txt',username+'\n');

            res.statusCode = 302;
            res.setHeader('Location','/password');
            res.end();
        });
        return;
    }
    if(url === '/password' && method === "GET"){
         res.setHeader('Content-Type','text/html');
        res.write('<html><body>');
        res.write('<form action = "/over" method = "POST"><label for="password">Password:</label><input type = "text" name = "password"></input><button type = "submit">submit</button></form>');
        res.write('</body></html>');
        return res.end();
    }
    if(url === '/over' && method === "POST"){
        const body1 = [];
        req.on('data',(chunk)=>{
            body1.push(chunk);
        });
        req.on('end',()=>{
            const parsedata1 = Buffer.concat(body1).toString();
            const password = parsedata1;
            fs.appendFile('password.txt',password,(err)=>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                res.end();
            });
        });
        return;
    }
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html');
    res.write('<html><h1>Page Not Found</h1></html>');
    res.end();
});

server.listen(7000);