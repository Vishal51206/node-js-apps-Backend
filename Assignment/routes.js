const fs = require('fs');
const requestHandler = (req,res)=>{
     const url = req.url;
   const method=req.method;
   if(url==='/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Details</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
   }
   if(url==='/message'&& method==="POST"){
    const body=[];
    req.on('data',(chunk) => {
      body.push(chunk);
    });
    req.on('end',()=>{
      const parsebody=Buffer.concat(body).toString();
      const message = parsebody.split('=')[1];
      fs.appendFile('Usernames.txt',message,(err)=>{
        res.statusCode=302; //Standard code for redirecting is '302'. //written in writefilefunction,because any error or endoffile comes then we go to homepage.
        res.setHeader('Location','/'); //set header as '/'(in our case assumed homepage).
        return res.end();
      });

    });
    return;
   }

    res.setHeader('Content-Type', 'text/html'); //telling browser what type of response we are sending.
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();   //stop sending response.
};

module.exports = requestHandler;  // conversts function to access globally for every files.
//can also do as
// module.exports ={
//     handler : requestHandler,  // accessed as routes.handler.
//     someText: "Hello Wassup",
// };
//also
//module.exports.handler = requestHandler;
