// server.js

const http = require('http')  ;
const port = process.env.PORT;
var fs = require('fs');


function calculateResponse(url, response) {
    var filename=url;
    if(url=="/") {
      filename="index.html"
    }
    else if(url.substring(0,1)=="/") {
      filename=url.substring(1);
    }
    var filecontents="";
    try {
        if(filename.substring(filename.length-5)==".html") {
          filecontents=fs.readFileSync(filename,'utf8');
          response.setHeader('Content-Type', 'text/html');
          response.statusCode = 200;
          response.end(filecontents);
        }
        else if(filename.substring(filename.length-3)==".js") {
          filecontents=fs.readFileSync(filename,'utf8');
          response.setHeader('Content-Type', 'text/javascript');
          response.statusCode = 200;
          response.end(filecontents);
        }
        else if(filename.substring(filename.length-4)==".css") {
          filecontents=fs.readFileSync(filename,'utf8');
          response.setHeader('Content-Type', 'text/css');
          response.statusCode = 200;
          response.end(filecontents);
        }
        else if(filename.substring(filename.length-4)==".jpg") {
          filecontents=fs.readFileSync(filename);
          response.setHeader('Content-Type', 'image/jpg');
          response.statusCode = 200;
          response.end(filecontents, "binary");
        }
        else {
          filecontents="404 Error";
          console.log("404 Error");
          response.setHeader('Content-Type', 'text/plain');
          response.statusCode = 404;
          response.end(filecontents);
        }
          
    }
    catch(err) {
        filecontents="404 Error";
        console.log("404 Error");
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 404;
        response.end(filecontents);
    }
    
}


const requestHandler = (request, response) => {  
  console.log(request.url);
  calculateResponse(request.url, response);
  // response.end('Hello Node.js Server!');
  
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})