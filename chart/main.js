import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as IOServer } from 'socket.io';


const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new IOServer(server);
const ioController = new IOController(io);
io.on('connection', socket => ioController.registerSocket(socket) );

server.listen(8080);
