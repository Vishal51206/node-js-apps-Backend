const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) =>{
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<form action = "/comment" method = "POST"><label for="comment">Comment</label><input type="text" name = "comment"></input><button type="submit">Submit</button></form>');
        res.write('</body></html>');
        return res.end();
    }
    if(url==='/comment' && method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedata = Buffer.concat(body).toString();
            const comment = parsedata.split('=')[1];
            fs.appendFile('comment.txt',comment,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
        return;
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html><h1>Welcome For Comments</h1></html>');
    res.end();
});

server.listen(5000);