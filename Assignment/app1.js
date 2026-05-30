const http = require('http');
const fs = require('fs');
const routes = require('../routes');  //using routes file by using modules in the routes file.
const server = http.createServer(routes);
server.listen(3000); //the code executes until some request it get and response is passed.
//take parameters but we are now only passing our wish port number so that we can localhost.