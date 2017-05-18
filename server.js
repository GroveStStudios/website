// server.js

const http = require('http')  ;
const port = process.env.PORT;
var fs = require('fs');


function calculateResponse(url, response) {
    var filename=url;
    if(url=="/") {
        filename="index.html"
    }
    var filecontents="";
    try {
        filecontents=fs.readFileSync(filename,'utf8');
    }
    catch(err) {
        filecontents="404 Error"
    }
    response.end(filecontents);
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