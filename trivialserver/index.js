import http from 'http';
import RequestController from './controller/requestController.js';

const server = http.createServer(

/*    (request, response) =>{
        response.setHeader('Content-type', 'text/html');
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end();



     } */
    (request, response) => new RequestController(request, response).buildResponse()
);

server.listen(8080);